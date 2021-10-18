const express = require('express');
const watchListModel = require('../../models/watch_list.model');
const schema = require('../../schemas/watch_list.schema.json');
const validate = require('../../middlewares/validate.mdw');
const auth = require('../../middlewares/auth.mdw');
const watch_listModel = require('../../models/watch_list.model');
const router = express.Router();
router.get('/', async (req, res) => {
  const account_id = req.pay_load.account_id;
  const rs = await watchListModel.findById(account_id) || [];
  res.status(200).json({watch_list: rs, message: "thành công"});
});
router.post('/', validate(schema), async (req, res) => {
  const watch_list = req.body;
  const isProductExist = await watchListModel.findByProductId(watch_list.product_id);

  if(isProductExist.length != 0){  
    return res.status(400).json({message: "Sản phẩm đã có trong danh sách watch_list"});
  }
  watch_list.account_id = req.pay_load.account_id;
  const rs = await watchListModel.add(watch_list);
  if(!rs){
    return res.status(400).json({message: "Thêm dữ liệu không thành công"});
  }
  res.status(200).json({message: "Thêm dữ liệu thành công"});
});
router.delete('/', async(req, res)=>{
  const wath_list = {account_id: req.pay_load.account_id, product_id: req.query.product_id || 0};
  const rs = await watchListModel.patch(wath_list, {status: 0});
  if(!rs){
    return res.status(400).json({message: "Xóa sản phẩm ra khởi watch_list không thành công"});
  }
  res.status(200).json({message: "Xóa sản phẩm ra khởi watch_list thành công"});
});



module.exports = router;