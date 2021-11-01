const express = require('express');
const categoryModel = require('../../models/category.model');
const typeModel = require('../../models/type.model');
const schema = require('../../schemas/category.schema.json');
const validate = require('../../middlewares/validate.mdw');
const productModel = require('../../models/product.model');
const router = express.Router();
router.get('/', async (req, res) => {
  if(req.pay_load.role_id != 3){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  const rs = await categoryModel.findAll();
  res.status(200).json(rs);
});
router.get('/type_and_category', async (req, res) => {
  if(req.pay_load.role_id != 3){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
  const rs = await typeModel.findAll();
 for(val of rs){
   const info_categorys = await categoryModel.findByType(val.type_id);
   val.categoy_id = info_categorys;
   console.log(rs);
 }
  res.status(200).json(rs);
});
router.post('/', validate(schema), async(req, res)=>{
  const rs = await categoryModel.add(schema);
  if(!rs){
    return res.status(400).json({message: "Thêm chuyên mục không thành công"});
  }
  return res.status(200).json({message: "Thêm chuyên mục thành công"});
})

router.patch('/', validate(schema, ["name", "category_id"]), async(req, res)=>{
  const rs = await categoryModel.patch(req.body.category_id, {name: req.body.name});
  if(!rs){
    return res.status(400).json({message: "Cập nhật tên chuyên mục không thành công"});
  }
  return res.status(200).json({message: "Cập nhật tên chuyên mục thành công"});
})

router.delete('/', async(req, res)=>{
  const categoy_id = req.query.categoy_id || 0;
  const products = await productModel.findAllByCategory_Id(categoy_id, true);
  console.log("product")
  if(products.length > 0){
    return res.status(400).json({message: 'Chuyên mục đã có sản phẩm, nên không được xóa chuyên mục'});
  }
  const rs = await categoryModel.patch(categoy_id, {status: 0});
  if(!rs){
    return res.status(400).json({message: "Xóa chuyên mục không thành công"});
  }
  return res.status(200).json({message: " Xóa chuyên mục thành công"});
});
module.exports = router;