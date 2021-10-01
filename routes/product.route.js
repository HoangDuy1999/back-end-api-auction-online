const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productModel = require('../models/product.model');
const schema = require('../schemas/product.schema');
const router = express.Router();
router.get('/', async (req, res) => {
  const condition_end_day = req.query.condition_end_day || false;
  const rs = await productModel.findAll(condition_end_day);
  res.status(200).json(rs);
});

router.get('info/:id', async (req, res) => {
  const product_id = parseInt(req.params.id) || 0;
  const infoProduct = await productModel.findById(product_id);
  const infoAuctioneers = await productModel.getInfoAuctioneer(product_id);
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

router.get('/type/:id', async (req, res)=>{
  const condition_end_day = req.query.condition_end_day || false;
  const type_id = parseInt(req.params.id) || 0;
  const info_types = await productModel.findAllByType_Id(type_id, condition_end_day);
  res.status(200).json({info_types});

})

router.get('/category/:id', async (req, res)=>{
  const condition_end_day = req.query.condition_end_day || false;
  const category_id = parseInt(req.params.id) || 0;
  const info_types = await productModel.findAllByCategory_Id(category_id, condition_end_day);
  res.status(200).json({info_types});

})

router.get('/home/top-5-time-run-out', async (req, res) => {
  const rs = await productModel.top_5_time_run_out();
  res.status(200).json(rs);
});

router.get('/home/top-5-highest-cost', async (req, res) => {
  const rs = await productModel.top_5_highest_cost();
  res.status(200).json(rs);
});

router.get('/home/top-5-highest-auctions', async (req, res) => {
  const rs = await productModel.top_5_highest_auction();
  res.status(200).json(rs);
});



module.exports = router;