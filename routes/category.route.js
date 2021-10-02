const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const categoryModel = require('../models/category.model');
const schema = require('../schemas/category.schema.json');
const auth = require('../middlewares/auth.mdw');
const router = express.Router();
router.get('/', async (req, res) => {
  // console.log(req.pay_load);
  // console.log(req.accessToken);
  const rs = await categoryModel.findAll();
  res.status(200).json(rs);
});
router.get('/:id', async (req, res) => {
  const category_id = req.params.id || 0;
  const rs = await categoryModel.findById(category_id);
  res.status(200).json(rs);
});



module.exports = router;