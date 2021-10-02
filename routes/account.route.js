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

router.post('/signin', validate(schema, ["email", "pass_word"]), async function (req, res) {
  const account = await accountModel.findByEmail(req.body.email.trim());
  if (account === null) {
    return res.status(400).json({
      "message": "email không tồn tại.",
      authenticated: false
    });
  }
  if (bcrypt.compareSync(req.body.pass_word, account.pass_word) === false) {
    return res.status(400).json({
      "message": "Mật khẩu không đúng.",
      authenticated: false
    });
  }

  const payload = { account_id: account.account_id, full_name: account.full_name, role_id: account.role_id }
  const opts = {
    expiresIn: 2 * 60 // seconds
  }
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, opts);

  const refreshToken = randomstring.generate(80);
  await accountModel.patch(account.account_id, {
    rf_token: refreshToken
  })

  return res.status(200).json({
    message: "Đăng nhập thành công",
    authenticated: true,
    accessToken,
    refreshToken,
  });
})


module.exports = router;