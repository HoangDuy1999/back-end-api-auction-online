const express = require('express');
const productModel = require('../../models/product.model');
const auctionModel = require('../../models/account.model');
const auctionDetailModel = require('../../models/auction_detail_model');
const rejectAuctionModel = require('../../models/reject_auction_model');
const schema = require('../../schemas/product.schema');
//const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.get('/', async (req, res) => {
  if(req.pay_load.role_id != 3){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  console.log(req.pay_load);
  console.log(req.accessToken);
  const condition_end_day = req.query.condition_end_day || false;
  const rs = await productModel.findAll(condition_end_day);
  res.status(200).json(rs);
});
router.patch('/removeProduct', async(req, res)=>{
  if(req.pay_load.role_id != 3){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  const p_id = req.query.id;
  if(!p_id){
   return res.status(400).json({message: "Không tìm thấy mã sản phẩm"});
  }
  const rs_product = await productModel.patch(p_id.trim(), {status: 0});
  if(!rs_product){
    return res.status(400).json({message: "Gỡ sản phẩm không thành công"});
  }
  const rs_auction = await auctionModel.patch(p_id.trim(), {status: 0});
  const rs_detail_auction = await auctionDetailModel.patch(rs_auction, {status: 0});
  const rs_reject_auction = await rejectAuctionModel.patch(rs_auction, {status: 0});
  //console.log(rs_detail_auction);
  res.status(200).json({message: "Gỡ sản phẩm thành công"});
});




module.exports = router;