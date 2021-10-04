const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const typeModel = require('../models/type.model');
const schema = require('../schemas/type.schema.json');
const auth = require('../middlewares/auth.mdw');
const router = express.Router();
const categoryModel = require('../models/category.model');
router.get('/', async (req, res) => {
  // console.log(req.pay_load);
  // console.log(req.accessToken);
  const rs = await typeModel.findAll();
  res.status(200).json(rs);
});
router.get('/fullinfos', async (req, res) => {
  // console.log(req.pay_load);
  // console.log(req.accessToken);
  const rs = await typeModel.findAll();
  let arrTypeInfos = [];
  for(let item of rs){
    const infoCategories = await categoryModel.findByType(item.type_id);
    // console.log(infoCategorys);
    // console.log("=============================")
    arrTypeInfos.push({types: {...item}, categories: infoCategories});
    //console.log(item.type_id);
  }
  //console.log(rs);
  res.status(200).json(arrTypeInfos);
});
router.get('/:id', async (req, res) => {
  const type_id = req.params.id || 0;
  const rs = await typeModel.findById(type_id);
  res.status(200).json(rs);
});



module.exports = router;