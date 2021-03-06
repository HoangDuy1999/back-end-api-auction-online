const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const evaluation_historyModel = require('../models/evaluation_history.model');
const validate = require('../middlewares/validate.mdw');
const validate_email = require('../middlewares/validate_email.mdw');
const schema = require('../schemas/account.schema.json');
const changePassWordschema = require('../schemas/change_password.schema.json');
const router = express.Router();
const randomstring = require('randomstring');
const auth = require('../middlewares/auth.mdw');
const auth_refresh = require('../middlewares/auth_refresh.mdw');
const mail_server = require('../middlewares/server_mail_mdw');
const { rejectSeries } = require('async');
router.get('/', async (req, res) => {
  const rs = await accountModel.findAll();
  res.status(200).json(rs);
});

router.get('/check_email', validate(schema, ["email"]), async(req, res) =>{
  const rs = await accountModel.findByEmail(req.body.email);
  if(rs === null){
    return res.status(400).json({message: "Email chưa đăng ký tài khoản"});
  }
  return res.status(200).json({message: "Email đã đăng ký tài khoản"});
});
router.post('/', validate(schema), async function (req, res) {
  let account = req.body;
  account.role_id = 1;
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

router.patch('/email', auth, validate(schema, ["email"]), async function (req, res) {
  const account = req.body;
  const account_id = req.pay_load.account_id;
  if (!validate_email(account.email)) {
    return res.status(400).json({ message: "Email không hợp lệ." });
  }
  const rs = await accountModel.patch(account_id, {email: account.email});
  if(!rs){
    return res.status(200).json({
      message: "Cập nhật email không thành công",
      email: account.email
    });
  }
  res.status(200).json({
    message: "Cập nhật email thành công",
    email: account.email
  });
});

router.get('/detail', auth, async(req, res)=>{
  const account_id = req.pay_load.account_id;
  const rs = await accountModel.findById(account_id);
  const rs_ev = await evaluation_historyModel.findByAccountId(account_id);
  res.json({info_account: rs, evaluation_history: rs_ev});
});

router.post('/signin', async function (req, res) {
  try {
    const { email, pass_word } = req.body;
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
      expiresIn: 100 * 60 // seconds
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, opts);
    let refreshToken = account.rf_token;
    if (account.rf_token == null) {
      refreshToken = randomstring.generate(80);
      console.log(refreshToken);
      await accountModel.patch(account.account_id, {
        rf_token: refreshToken
      })
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      authenticated: true,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ" });
  }
})
router.post('/refreshToken', auth_refresh, async(req, res) =>{
  console.log(req.pay_load);
  const account_id = req.pay_load.account_id || 0;
  const account = await accountModel.findById(account_id);
  if(account == null){
    return res.status(400).json({message: 'Không tìm thấy thông tin tài khoản'});
  }
  if(account.rf_token != req.refreshToken){
    return res.status(400).json({message: 'refreshToken không hợp lệ'});
  }
  const payload = { account_id: account.account_id, full_name: account.full_name, role_id: account.role_id }
  const opts = {
    expiresIn: 10 * 60 // seconds
  }
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, opts);
  //let refreshToken = account.rf_token;
  // if (account.rf_token == null) {
  //   refreshToken = randomstring.generate(80);
  //   console.log(refreshToken);
  //   await accountModel.patch(account.account_id, {
  //     rf_token: refreshToken
  //   })
  // }
  res.status(200).json({accessToken})
});

router.post('/signout', auth, async (req, res) => {
  const { account_id } = req.pay_load;
  const rs = await accountModel.patch(account_id, { rf_token: null });
  if (rs) {
    res.status(200).json({ message: 'Đăng xuất thành công.' });
  } else {
    res.status(400).json({ message: 'Đăng xuất không thành công.' });
  }
})
router.post('/login-google', async (req, res) => {
  const { email } = req.body;
  if (email) {
    const account = await accountModel.findByEmail(email.trim());
    if (account) {
      const payload = { account_id: account.account_id, full_name: account.full_name, role_id: account.role_id }
      const opts = {
        expiresIn: 2 * 60 // seconds
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, opts);
      let refreshToken = account.rf_token;
      if (account.rf_token == null) {
        refreshToken = randomstring.generate(80);
        console.log(refreshToken);
        await accountModel.patch(account.account_id, {
          rf_token: refreshToken
        })
      }
      return res.status(200).json({
        message: "Đăng nhập thành công",
        authenticated: true,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Tài khoản chưa đăng ký" });
    }
  } else {
    res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ" });
  }
});

router.patch('/password', auth, validate(changePassWordschema), async(req, res)=>{
  const account = req.body;
  account.account_id = req.pay_load.account_id;
  const info_account = await accountModel.findById(account.account_id);
  if(info_account == null){
    return res.status(400).json({
      "message": "Đổi mật khẩu không thành công",
    });
  }
  if (bcrypt.compareSync(account.pass_word, info_account.pass_word) === false) {
    return res.status(400).json({
      "message": "Mật khẩu cũ không đúng.",
      authenticated: false
    });
  }
  const pass_word = bcrypt.hashSync(account.new_pass_word, parseInt(process.env.SALT));
  const rs = await accountModel.patch(account.account_id, {pass_word: pass_word});
  if(!rs){
    return res.status(400).json({"message": "Cập nhật không mật khẩu thành công"});
  }
  res.status(200).json({"message": "Cập nhật mật khẩu thành công"})
});

router.patch('/fullname', auth, validate(schema, ["full_name"]), async(req, res)=>{
  const account = req.body;
  account.account_id = req.pay_load.account_id;
  const rs = await accountModel.patch(account.account_id, {full_name: account.full_name});
  if(!rs){
    return res.status(400).json({"message": "Cập nhật họ tên không thành công"});
  }
  res.status(200).json({"message": "Cập nhật họ tên thành công"})
});

router.post('/sendOtpSignUp', validate(schema, ["email", "full_name"]), async (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name) {
    return res.status(400).json({ message: 'Thiếu trường tên người đăng ký' })
  }
  const rs = await accountModel.findByEmail(email.trim());
  if (rs) {
    return res.status(400).json({ message: 'Email đã đăng ký tài khoản rồi.' });
  }
  const otp = await mail_server.sendEmailSignUp(email, full_name);
  res.status(200).json({ message: "Gửi mã otp thành công", otp: otp });
})


router.post('/sendOtpChangeEmail', validate(schema, ["email", "full_name"]), async (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name) {
    return res.status(400).json({ message: 'Thiếu trường tên người dùng' })
  }
  const rs = await accountModel.findByEmail(email.trim());
  if (!rs) {
    return res.status(400).json({ message: 'Email không tồn tại trong hệ thống.' });
  }
  const otp = await mail_server.sendOtpChangeEmail(email, full_name);
  res.status(200).json({ message: "Gửi mã otp thành công", otp: otp });
})
router.post("/sendOtpResetPassWord",validate(schema, ["email"]), async(req, res)=>{
  const rs = await accountModel.findByEmail(req.body.email);
  if(rs === null){
    return res.status(400).json({message: "Email không hợp lệ."});
  }
  const otp = await mail_server.sendOtpResetPassWord(req.body.email, rs.full_name);
  res.status(200).json({ message: "Gửi mã otp thành công", otp: otp, info: rs });
});

router.patch("/reset_password", validate(schema, ["account_id"]), async(req, res)=>{
  if(req.body.pass_word === undefined){
    req.body.pass_word = "sandaugia";
  }
  const rs = await accountModel.findById(req.body.account_id);
  req.body.pass_word = bcrypt.hashSync(req.body.pass_word, parseInt(process.env.SALT));
  await accountModel.patch(req.body.account_id, {pass_word: req.body.pass_word, rf_token: null});
  await mail_server.sendEmailResetPassWord(rs.email);
  res.status(200).json({message: "Reset mật khẩu thành công."});
});

module.exports = router;