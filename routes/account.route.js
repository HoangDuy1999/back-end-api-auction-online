const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const validate = require('../middlewares/validate.mdw');
const validate_email = require('../middlewares/validate_email.mdw');
const schema = require('../schemas/account.schema.json');
const router = express.Router();
const randomstring = require('randomstring');

router.get('/', async (req, res) => {
  const rs = await accountModel.findAll();
  res.status(200).json(rs);
});

router.post('/', validate(schema), async function (req, res) {
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
  if(!result[0]){
    return res.statusCode(400).json({message: "Thêm tài khoản không thành công"});
  }
  
  account.account_id = result[0];
  res.status(200).json({
    message: "Thêm tài khoản thành công.",
    account: {...account}
  });
});

module.exports = router;