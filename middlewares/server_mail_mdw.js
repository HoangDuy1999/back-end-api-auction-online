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
  },
  sendEmailSellerTimeAuctionOverNoBidder(emailReceive, username="unknow", product_name, product_id) {
    transporter.sendMail(format_email.sendEmailSellerTimeAuctionOverNoBidder(
      emailReceive, username, product_name, product_id), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailSellerTimeAuctionOverHasBidder(emailReceive, username, bidder_name, product_name, product_id, cost){
    transporter.sendMail(format_email.sendEmailSellerTimeAuctionOverHasBidder(
      emailReceive, username, bidder_name, product_name, product_id, cost), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailBidderSuccessAuction(emailReceive, username, seller_name, product_name, product_id, cost){
    transporter.sendMail(format_email.sendEmailBidderSuccessAuction(
      emailReceive, username, seller_name, product_name, product_id, cost), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  }
}


