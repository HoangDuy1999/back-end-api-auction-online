const nodemailer = require("nodemailer");
const accountModel = require('../models/account.model');
const format_email = require('../templates/format_email.template.js');
var isforgotpassword = false;
var otp = "";
var username = ""
const transporter = nodemailer.createTransport({ // config mail server
  service: 'Gmail',
  auth: {
    user: 'sandaugiaduythien',
    pass: 'hadesduy13051999'
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
  sendOtpResetPassWord(r_email, username= "unknown") {
    const otp = Math.floor(100000 + Math.random() * 900000);
    transporter.sendMail(format_email.sendOtpResetPassWord(r_email, username, otp), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return otp;
  },
  sendEmailResetPassWord(r_email, username= "unknown") {
    //const otp = Math.floor(100000 + Math.random() * 900000);
    transporter.sendMail(format_email.sendEmailResetPassWord(r_email), function (err, info) {
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
  },
  sendEmailBidderSuccessTemporaryAuction(emailReceive, username, seller_name, product_name, product_id, cost){
    transporter.sendMail(format_email.sendEmailBidderSuccessTemporaryAuction(
      emailReceive, username, seller_name, product_name, product_id, cost), function (err, info) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailBidderSuccessTemporaryBeforeAuctionBuyNow(emailReceive, username, product_name, product_id){
    transporter.sendMail(format_email.sendEmailBidderSuccessTemporaryBeforeAuctionBuyNow(
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
  sendEmailBidderSuccessTemporaryBeforeAuction(emailReceive, username, product_name, product_id){
    transporter.sendMail(format_email.sendEmailBidderSuccessTemporaryBeforeAuction(
      emailReceive, username, product_name, product_id), function (err, info) {
      if (err) {
        console.log("===============================")
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailBidderSuccessWhenChangeDescription(product_id, name, email, full_name){
    transporter.sendMail(format_email.sendEmailBidderSuccessWhenChangeDescription(
      product_id, name, email, full_name), function (err, info) {
      if (err) {
        console.log("===============================")
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailSellerWhenSomeOneAuctionProduct(emailReceive, username, bidder_name, product_name, product_id, cost){
    transporter.sendMail(format_email.sendEmailSellerWhenSomeOneAuctionProduct(
      emailReceive, username, bidder_name, product_name, product_id, cost), function (err, info) {
      if (err) {
        console.log("===============================")
        console.log(err);
        return 0;
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
    return 1;
  },
  sendEmailBidderWhenSellerRejectAuction(emailReceive, username, product_name, product_id){
    transporter.sendMail(format_email.sendEmailBidderWhenSellerRejectAuction(
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

}


