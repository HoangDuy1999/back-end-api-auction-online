const express = require('express');
const moment = require('moment');
const productModel = require('../../models/product.model');
const categoryModel = require('../../models/category.model');
const rejectAuctionModel = require('../../models/reject_auction_model');
const productImageModel = require('../../models/product_image.model');
const auctionModel = require('../../models/auction_model');
const auctionDetailModel = require('../../models/auction_detail_model');
const schema = require('../../schemas/product.schema');
const rejectAuctionSchema = require('../../schemas/reject_auction.schema.json');
const validate = require('../../middlewares/validate.mdw');
const auth = require('../../middlewares/auth.mdw');
const router = express.Router();

router.get('/info/:id', async (req, res) => {
  const product_id = parseInt(req.params.id) || 0;
  const infoProduct = await productModel.findByIdWithAuth(product_id);
  if(!infoProduct.length){
    return res.status(400).json({message: "Sản phẩm đã bị xóa"});
  }
  const date = new Date();
  infoProduct[0].compare_day = infoProduct[0].end_day - date;
  const infoAuctioneers = await productModel.getInfoAuctioneer(product_id);
  if(infoAuctioneers.length < 1){
    infoProduct[0].compare_day = 0;
  }
  if (!infoProduct) {
    return res.status(400).json({ message: 'Không tìm thấy thông tin sản phẩm' });
  }
  //get full images
  const p_images = await productModel.findImageByProductId(product_id);
  let image = [infoProduct[0].image];
  for (let i = 0; i < p_images.size; i++) {
    console.log(p_images[i]);
  }
  for (let item of p_images) {
    image.push(item.image);
  }
  //relation product
  const relation_product = await productModel.findRelationCategory(infoProduct[0].category_id, product_id);
  infoProduct[0].image = image;
  res.status(200).json({
    infoProduct: infoProduct[0],
    infoAuctioneers: infoAuctioneers,
    relation_product: relation_product
  });
});

router.post('/', validate(schema), async (req, res) => {
  let product = req.body;
  let today = new Date();
  req.body.seller_id = req.pay_load.account_id;
  // product.seller_id = req.pay_load.account_id;
  // const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  today = moment(today).format('YYYY-MM-DD HH:MM:SS');;
  product.start_day = new Date(product.start_day);
  product.end_day = new Date(product.end_day);
  product.start_day = moment(product.start_day).format('YYYY-MM-DD HH:MM:SS');
  product.end_day = moment(product.end_day, "DD/MM/YYYY HH:MM:SS").format('YYYY-MM-DD HH:MM:SS');
  if (product.start_day == "Invalid date") {
    return res.status(400).json({ message: 'Định dạng ngày bắt đầu không hợp lệ' });
    console.log(11);
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
  const info_cate = await categoryModel.findById(product.category_id);
  if (info_cate == null) {
    return res.status(400).json({ message: "id chuyên mục không hợp lệ" });
  }
  console.log(info_cate);
  product.type_id = info_cate.type_id;
  const a_image = product.image.split(",");
  //console.log(a_image.length);
  if (a_image.length < 3) {
    return res.status(400).json({ message: 'Số lượng ảnh cho sản phẩm phải từ 3 trở lên ' });
  }
  product.image = a_image[0];
  const rs_product = await productModel.add(product);
  if (!rs_product) {
    return res.status(400).json({ message: 'Thêm sản phẩm không thành công' });
  }
  auctionModel.add({ product_id: rs_product });
  const product_image = a_image.map(value =>
    ({ product_id: rs_product, image: value }));
  console.log(product_image);
  productImageModel.add(product_image);

  res.status(200).json({ message: 'thêm thành công sản phẩm' });
});
router.post('/reject_auction', validate(rejectAuctionSchema), async (req, res) => {
  const rs_auction = await auctionModel.findById(req.body.auction_id);
  if (rs_auction == null) {
    res.status(400).json({ message: "Từ chối đấu giá đối với người này thành công" })
  }
  const rs = await rejectAuctionModel.add(req.body);
  if (!rs) {
    return res.status(400).json({ message: "Từ chối đấu giá đối với người này không thành công" })
  }
  // đang giữ giá
  if (rs_auction.bidder_id == req.body.account_id) {
    const rs_auction_detail = await auctionDetailModel.findAllByAuctionIdAndRejectId(
      rs_auction.auction_id, rs_auction.bidder_id
    );
    if (rs_auction_detail.length == 0) {
      await auctionModel.patch(rs_auction.auction_id, { bidder_id: null, current_cost : null });
    }
    if (rs_auction_detail.length == 1) {
      const rs_product = await productModel.findByIdNoCheckExpired(rs_auction.product_id);
      if (rs_product.length > 0) {
        await auctionModel.patch(rs_auction.auction_id, { bidder_id: rs_auction_detail[0].bidder_id, current_cost: rs_product[0].start_cost + rs_product[0].step_cost });
      }
    }
    if (rs_auction_detail.length > 1) {
      const rs_product = await productModel.findByIdNoCheckExpired(rs_auction.product_id);
      if (rs_product.length > 0) {
        await auctionModel.patch(rs_auction.auction_id, { bidder_id: rs_auction_detail[0].bidder_id, current_cost: rs_auction_detail[1].cost + rs_product[0].step_cost });
      }
    }
  }
  await auctionDetailModel.patchByAuctionAndAccountId(rs_auction.auction_id, req.body.account_id, {status: 0});
  res.status(200).json({ message: "Từ chối đấu giá đối thành công" })
});
router.patch('/', validate(schema, ["product_id", "description"]), async (req, res) => {
  const product = req.body;
  const rs = await productModel.patch(product.product_id, { description: product.description });
  if (!rs) {
    return res.status(400).json({ message: "cập nhật mô tả không thành công" });
  }
  res.status(200).json({ message: "cập nhật mô tả thành công" });
});
router.get('/post_unexpired', async (req, res) => {
  const account_id = req.pay_load.account_id;
  const rs = await productModel.getPostUnexpired(account_id);
  res.status(200).json(rs);
});
router.get('/post_expired', async (req, res) => {
  const account_id = req.pay_load.account_id;
  const rs = await productModel.getPostExpired(account_id);
  res.status(200).json(rs);
});



module.exports = router;