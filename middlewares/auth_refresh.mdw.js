const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const jwt_decode =  require('jwt-decode');
module.exports = async function auth(req, res, next) {
  const accessToken = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];
  let decoded = {};
  if (accessToken || refreshToken) {
    try {
      console.log("ok");
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, { complete: true });
      console.log(decoded);
      req.pay_load = decoded;
      //req.accessToken = null;
      next();
    } catch (err) {
      if (err.message === "jwt expired") {
        decoded = jwt_decode(accessToken);
        req.pay_load = decoded;
        req.refreshToken = refreshToken;
        next();
      } else {
        console.log(err);
        return res.status(400).json({
          message: 'Access token không hợp lệ'
        });
      }
      // decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      // console.log(decoded);
      // req.pay_load = decoded;
    }
    // console.log(err);
    // return res.status(400).json({
    //   message: 'Access token đã hết hạn'
    //});
    // const account = await accountModel.findByRefreshToken(refreshToken);
    // if (account === null) {
    //   //console.log(err);
    //   return res.status(400).json({
    //     message: 'refresh token không khợp lệ.'
    //   });
    // } else {
    //   const payload = { account_id: account.account_id, full_name: account.full_name, role_id: account.role_id }
    //   const opts = {
    //     expiresIn: 2 * 60 // seconds
    //   }
    //req.accessToken = "";//jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, opts);
    //   decoded = jwt.verify(req.accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    //   req.pay_load = decoded;
    //   next()
    // }
    //}
  } else {
    return res.status(400).json({
      message: 'Thiếu accessToken và refreshToken.'
    });
  }
}