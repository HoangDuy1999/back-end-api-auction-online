const express = require('express');
const productModel = require('../../models/product.model');
const auctionModel = require('../../models/account.model');
const auctionDetailModel = require('../../models/auction_detail_model');
const rejectAuctionModel = require('../../models/reject_auction_model');
const schema = require('../../schemas/product.schema');
const evaluationModel = require('../../models/evaluation_history.model');
//const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.get('/history_auction', async (req, res) => {
  const account_id = req.pay_load.account_id;
  console.log(account_id);
  const info = await auctionDetailModel.findHistoryAuctionBidder(account_id);
  res.status(200).json(info);
});
router.get('/evaluation', async(req, res) => {
  const seller_id = req.query.seller_id || 0;
  const bidder_id = req.pay_load.account_id || 0;
  console.log(seller_id);
  console.log(bidder_id);
  let rs = await evaluationModel.findByAccountAndAssensor(bidder_id, seller_id);
  if(rs.length < 1){
    rs = {description: null}
  }else{
    rs = rs[0];
  }
  return res.status(200).json(rs);
});

router.get('/auction_progress', async (req, res) => {
  const account_id = req.pay_load.account_id;
  console.log(account_id);
  const info = await auctionDetailModel.findHistoryAuctionProgressBidder(account_id);
  res.status(200).json(info);
});



module.exports = router;