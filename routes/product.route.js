const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productModel = require('../models/product.model');
const schema = require('../schemas/product.schema');
const router = express.Router();
router.get('/', async (req, res) => {
  const rs = await productModel.findAll();
  res.status(200).json(rs);
});

router.get('/:id', async (req, res) => {
  const product_id = req.params.id || 0;
  const infoProduct = await productModel.findById(product_id);
  const infoAuctioneers = await productModel.getInfoAuctioneer(product_id);
  if(!infoProduct){
    return res.status(400).json({message: 'Không tìm thấy thông tin sản phẩm'});
  }
  //const rs = await productModel.findAll();
  res.status(200).json({
    infoProduct: infoProduct[0],
    infoAuctioneers: infoAuctioneers
  });
});

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