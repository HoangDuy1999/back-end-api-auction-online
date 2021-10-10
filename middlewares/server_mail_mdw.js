const nodemailer = require("nodemailer");
const accountModel = require('../models/account.model');
const format_email = require('../templates/format_email.template.js');
var isforgotpassword = false;
var otp = "";
var username = ""
const transporter = nodemailer.createTransport({ // config mail server
  service: 'Gmail',
  auth: {
    user: 'hadesduy0004@gmail.com',
    pass: 'duy13051999'
  }
});
module.exports = {
  sendEmailSignUp(r_email, username= "unknown") {
    const otp = Math.floor(100000 + Math.random() * 900000);
    transporter.sendMail(format_email.otpSignUp(r_email, username, otp), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return otp;
  },
  sendOtpChangeEmail(r_email, username= "unknown") {
    const otp = Math.floor(100000 + Math.random() * 900000);
    transporter.sendMail(format_email.otpChangeEmail(r_email, username, otp), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return otp;
  }
}


