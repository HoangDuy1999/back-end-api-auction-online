const _ = require('lodash');
const Async = require('async');
const auctionModel = require('../models/auction_model');
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
          if (Variable.LIST_AUCTIONS.length < 1) {
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
    Variable.POOL_EXECUTE = Async.cargo((tasks, callback) => {
      try {
        if (tasks[0] !== null) {
          const task = tasks[0];
          (async () => {
            console.log("product_id: ", task.product_id);
            console.log("pool_excute");
            await auctionModel.patch(task.auction_id, { is_send_notification: true });
            callback();
            return true;
          })();
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
      await Private.Delay(10000);
      if (Variable.LIST_AUCTIONS.length > 0) {
        console.log("=================================")
        const linkInfo = Variable.LIST_AUCTIONS.shift();
        console.log("=================================")
        Variable.POOL_EXECUTE.push(linkInfo);
      } else Variable.POOL_EXECUTE.push(null);
    });

    Variable.POOL_EXECUTE.drain(() => {
      console.log("pool_excute_rain");
      (async () => {
        // await Private.Delay(10000);
        Variable.POOL_LOAD.push(1);
      })();
    });

    Variable.POOL_LOAD.push(1);
  }
};

module.exports = Module;

