const express = require('express');
const accountModel = require('../../models/account.model');
const evaluation_historyModel = require('../../models/evaluation_history.model');
const schema = require('../../schemas/account.schema.json');
const validate = require('../../middlewares/validate.mdw');
const validate_email = require('../../middlewares/validate_email.mdw');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { route } = require('./product.route');
//const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.get('/', async (req, res) => {
  if (req.pay_load.role_id != 3) {
    return res.status(401).json({ message: "Bạn không có quyền truy cập" });
  }
  // console.log(req.pay_load);
  //  console.log(req.accessToken);
  const rs = await accountModel.findAll();
  res.status(200).json(rs);
});
router.post('/', validate(schema, ["full_name", "pass_word", "email", "address", "role_id"]), async (req, res) => {
  let account = req.body;
  account.pass_word = bcrypt.hashSync(account.pass_word, parseInt(process.env.SALT));
  if (!validate_email(account.email)) {
    return res.status(400).json({ message: "Email không hợp lệ." });
  }

  const rs_email = await accountModel.findByEmail(account.email.trim());
  if (rs_email !== null) {
    return res.status(400).json({ message: "Email đã tồn tại." });
  }

  const result = await accountModel.add(account);
  if (!result[0]) {
    return res.statusCode(400).json({ message: "Thêm tài khoản không thành công" });
  }

  account.account_id = result[0];
  res.status(200).json({
    message: "Thêm tài khoản thành công.",
    account: { ...account }
  });
});

router.patch('/', validate(schema, ["account_id"]), async (req, res) => {
  const account = req.body;
  const id = account.account_id || 0;
  delete account.account_id;
  if (_.isEmpty(account)) {
    return res.status(400).json({ message: 'không có dữ liệu cập nhật!' });
  }
  if(account.pass_word){
    account.pass_word = bcrypt.hashSync(account.pass_word, parseInt(process.env.SALT));
  }
  const affected_rows = await accountModel.patch(id, account);
  if (affected_rows > 0) {
    return res.status(200).json({message: 'cập nhật thành công.'});
  } else {
    return res.status(400).json({message: 'Cập nhật không thành công'});
  }
});
router.delete('/', async(req, res)=>{
  const account_id = req.query.account_id;
  const rs = await accountModel.patch(account_id,{status: 0});
  if(!rs){
    return res.status(400).json({message: "Xóa tài khoản không thành công"});
  }
  res.status(200).json({message: "Xóa tài khoản thành công"});

});
router.get("/detail/:id", async(req, res) =>{
  const account_id = req.params.id || 0;
  const rs = await accountModel.findById(account_id);
  //console.log(rs);
  const rs_ev = await evaluation_historyModel.findByAccountId(account_id);
  res.status(200).json({info_acount: rs, evaluation_history: rs_ev});
});
router.get('/bidder', async (req, res) => {
  if (req.pay_load.role_id != 3) {
    return res.status(401).json({ message: "Bạn không có quyền truy cập" });
  }
  const rs = await accountModel.findAllBidder();
  res.status(200).json(rs);
});

router.patch('/upgrade', async (req, res) => {
  const account_id = req.query.account_id;
  if(!account_id){
    return res.status(400).json({message: "Dữ liệu đầu vào không hợp lệ"});
  }
  const rs = await accountModel.patch(account_id, {role_id: 2, request_update: 0});
  if(!rs){
    return res.status(400).json({message: "Nâng cấp tài khoản không thành công"});
  }
  res.status(200).json({message: "Nâng cấp tài khoản thành công"});
});
router.patch('/inferior', async (req, res) => {
  const account_id = req.query.account_id;
  if(!account_id){
    return res.status(400).json({message: "Dữ liệu đầu vào không hợp lệ"});
  }
  const rs = await accountModel.patch(account_id, {role_id: 1});
  if(!rs){
    return res.status(400).json({message: "Hạ cấp tài khoản không thành công"});
  }
  res.status(200).json({message: "Hạ cấp tài khoản thành công"});
});




module.exports = router;