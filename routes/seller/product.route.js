const express = require('express');
const moment = require('moment');
const productModel = require('../../models/product.model');
const rejectAuctionModel = require('../../models/reject_auction_model');
const productImageModel = require('../../models/product_image.model');
const auctionModel = require('../../models/auction_model');
const schema = require('../../schemas/product.schema');
const rejectAuctionSchema = require('../../schemas/reject_auction.schema.json');
const validate = require('../../middlewares/validate.mdw');
const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.post('/', validate(schema), async (req, res) => {
  let product = req.body;
  let today = new Date();
  product.seller_id = req.pay_load.account_id;
  const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  today = date + ' ' + time;
  product.start_day = moment(product.start_day, "DD/MM/YYYY HH:MM:S").format('YYYY/MM/DD HH:MM:SS');
  product.end_day = moment(product.end_day, "DD/MM/YYYY HH:MM:S").format('YYYY/MM/DD HH:MM:SS');
  if (product.start_day == "Invalid date") {
    return res.status(400).json({ message: 'Định dạng ngày bắt đầu không hợp lệ' });
  }
  if (product.end_day == "Invalid date") {
    return res.status(400).json({ message: 'Định dạng ngày kết thúc không hợp lệ' });
  }
  if (product.start_day < today) {
    return res.status(400).json({ message: 'Thời gian ngày băt đầu không hợp lệ' });
  }
  if (product.start_day > product.end_day) {
    return res.status(400).json({ message: 'Thời gian ngày kết thúc không hợp lệ' });
  }
  const a_image = product.image.split(",");
  //console.log(a_image.length);
  if (a_image.length < 3) {
    return res.status(400).json({ message: 'Số lượng ảnh cho sản phẩm phải từ 3 trở lên ' });
  }
  product.image = a_image[0];
  const rs_product = await productModel.add(product);
  if(!rs_product){
    return res.status(400).json({ message: 'Thêm sản phẩm không thành công' });
  }
  auctionModel.add({product_id: rs_product});
  const product_image = a_image.map(value =>
    ({ product_id: rs_product, image: value }));
  console.log(product_image);
  productImageModel.add(product_image);

  res.status(200).json({message: 'thêm thành công sản phẩm'});
});
router.post('/reject_auction', validate(rejectAuctionSchema), async (req, res) => {
  const rs = await rejectAuctionModel.add(req.body);
  if(!rs){
    return res.status(400).json({message: "Từ chối đấu giá đối với người này không thành công"})
  }
  res.status(400).json({message: "Từ chối đấu giá đối với người này thành công"})
});
router.patch('/', validate(schema, ["product_id", "description"]), async(req,res)=>{
  const product = req.body;
  const rs = await productModel.patch(product.product_id, {description: product.description});
  if(!rs){
    return res.status(400).json({message: "cập nhật mô tả không thành công"});
  }
  res.status(400).json({message: "cập nhật mô tả thành công"});
});
router.get('/post_unexpired', async(req, res)=>{
  const account_id = req.pay_load.account_id;
  const rs = await productModel.getPostUnexpired(account_id);
  res.status(200).json(rs);
});
router.get('/post_expired', async(req, res)=>{
  const account_id = req.pay_load.account_id;
  const rs = await productModel.getPostExpired(account_id);
  res.status(200).json(rs);
});



module.exports = router;