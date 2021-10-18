const _ = require('lodash');
const Async = require('async');
const auctionModel = require('../models/auction_model');
const mail_server = require('../middlewares/server_mail_mdw');
const Variable = {
  POOL_LOAD: null,
  POOL_EXECUTE: null,
  LIST_AUCTIONS: []
};
const Private = {
  async Delay(delayTime) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delayTime);
    });
  }
};
const Module = {
  async Init() {
    Variable.POOL_LOAD = Async.queue((task, callback) => {
      try {
        (async () => {
          console.log("pool_load");
          //console.log(Variable.LIST_AUCTIONS.length);
          if (Variable.LIST_AUCTIONS.length < 1) {
            await Private.Delay(10000);
            console.log("length: ", Variable.LIST_AUCTIONS.length);
            const auctionLists = await auctionModel.getAuctionExpired();
            //console.log(auctionLists);
            // console.log("pooload: ", auctionLists[0].product_id);
            _.forEach(auctionLists, (auction) => {

              Variable.LIST_AUCTIONS.push({
                ...auction
              });
            });
          }
        })();
      } catch (error) {
        return error;
      } finally {
        callback();
      }
      return true;
    });
    Variable.POOL_EXECUTE = Async.cargo(async(tasks, callback) => {
      try {
        if (tasks[0] !== null) {
          const task = tasks[0];
          // console.log("product_id: ", task);
          await auctionModel.patch(task.auction_id, { is_send_notification: true });
          console.log("pool_excute111111111111111");
          //trường hợp không ai mua
          if (task.current_cost == null || task.current_cost == 0) {
            mail_server.sendEmailSellerTimeAuctionOverNoBidder(
              task.seller_email, task.seller_name, task.name, task.product_id);
          }
          //trường hợp có người mua
          console.log(task.bidder_email);
          console.log(task.seller_email);
          if (task.current_cost != null && task.current_cost > 0) {
            mail_server.sendEmailSellerTimeAuctionOverHasBidder(
              task.seller_email, task.seller_name, task.bidder_name, task.name, task.product_id, task.current_cost);
            mail_server.sendEmailBidderSuccessAuction(
              task.bidder_email, task.bidder_name, task.seller_name, task.name, task.product_id, task.current_cost);
          }
          callback();
        } else {
          callback();
          return false;
        }
      } catch (error) {
        throw error;
      }
    }, 1);
    Variable.POOL_LOAD.drain(async () => {
      console.log("pool_load_rain");
      if (Variable.LIST_AUCTIONS.length > 0) {
        const linkInfo = Variable.LIST_AUCTIONS.shift();
        Variable.POOL_EXECUTE.push(linkInfo);
      } else {
        await Private.Delay(5000);
        Variable.POOL_EXECUTE.push(null)
      };
    });

    Variable.POOL_EXECUTE.drain(() => {
      console.log("pool_excute_drain");
      (async () => {
        await Private.Delay(2000);
        Variable.POOL_LOAD.push(1);
      })();
    });

    Variable.POOL_LOAD.push(1);
  }
};

module.exports = Module;

