const express = require('express');
const productModel = require('../../models/product.model');
const auctionModel = require('../../models/account.model');
const auctionDetailModel = require('../../models/auction_detail_model');
const rejectAuctionModel = require('../../models/reject_auction_model');
const schema = require('../../schemas/product.schema');
//const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.get('/history_auction', async (req, res) => {
  if(req.pay_load.role_id != 1){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  const account_id = req.pay_load.account_id;
  console.log(account_id);
  const info = await auctionDetailModel.findHistoryAuctionBidder(account_id);
  res.status(200).json(info);
});
router.get('/auction_progress', async (req, res) => {
  if(req.pay_load.role_id != 1){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  const account_id = req.pay_load.account_id;
  console.log(account_id);
  const info = await auctionDetailModel.findHistoryAuctionProgressBidder(account_id);
  res.status(200).json(info);
});



module.exports = router;