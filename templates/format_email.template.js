module.exports = {
  otpSignUp(emailReceive, username, otp) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Để xác nhận bạn xác nhận đăng ký tài khoản tại website đấu giá <b>S_auction</b> </p>
            <p>Mã OTP: <b>${otp}</b></p>
            <div style="color: red;  font-style: italic;">Vui lòng không cung cấp mã OTP này cho ai khác. Xin cảm ơn! </div>
            <div>Chào bạn</div>
            `
    }
  },
  otpChangeEmail(emailReceive, username, otp) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Mã otp dưới đây là dùng để đổi email tại website: <b>S_auction</b> </p>
            <p>Mã OTP: <b>${otp}</b></p>
            <div style="color: red;  font-style: italic;">Vui lòng không cung cấp mã OTP này cho ai khác. Xin cảm ơn! </div>
            <div>Chào bạn</div>
            `
    }
  },
  sendOtpResetPassWord(emailReceive, username, otp) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Mã otp dưới đây là dùng để đổi reset mật khẩu tại website: <b>S_auction</b> </p>
            <p>Mã OTP: <b>${otp}</b></p>
            <div style="color: red;  font-style: italic;">Vui lòng không cung cấp mã OTP này cho ai khác. Xin cảm ơn! </div>
            <div>Chào bạn</div>
            `
    }
  },
  sendEmailResetPassWord(emailReceive) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn</p>
            <p>Hệ thống đã reset mật khẩu mặc định cho tài khoản của bạn là: 'sandaugia' tại website: <b>S_auction</b> </p>
            <div style="color: red;  font-style: italic;">Vui lòng không cung cấp mã OTP này cho ai khác. Xin cảm ơn! </div>
            `
    }
  },
  sendEmailSellerTimeAuctionOverNoBidder(emailReceive, username, product_name, product_id) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Sản phẩm đăng bán: <b> ${product_name}</b> </p>
            <p>Tình trạng: Phiên đấu giá đã kết thúc</p>
            <p>Người mua: <b>Không có ai mua</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}"> ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailSellerTimeAuctionOverHasBidder(
    emailReceive, username, bidder_name, product_name, product_id, cost) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Sản phẩm đăng bán: <b> ${product_name}</b> </p>
            <p>Tình trạng: Phiên đấu giá đã kết thúc</p>
            <p>Người mua: <b>${bidder_name}</b></p>
            <p>Giá bán: <b>${cost} đ</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailBidderSuccessAuction(
    emailReceive, username, seller_name, product_name, product_id, cost) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Sản phẩm: <b> ${product_name}</b> </p>
            <p>Tình trạng: Bạn đã chiến thắng đấu giá sản phẩm này.</p>
            <p>Người bán: <b>${seller_name}</b></p>
            <p>Giá mua: <b>${cost} đ</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailBidderSuccessTemporaryAuction(
    emailReceive, username, seller_name, product_name, product_id, cost) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Sản phẩm: <b> ${product_name}</b> </p>
            <p>Tình trạng: <b>Bạn hiện đang giữ giá đấu giá của sản phẩm này.</b></p>
            <p>Người bán: <b>${seller_name}</b></p>
            <p>Giá mua hiện tại: <b>${cost} đ</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailBidderSuccessTemporaryBeforeAuctionBuyNow(
    emailReceive, username, product_name, product_id) {
      return {
        from: 'sandaugiaduythien@gmail.com',
        to: emailReceive,
        subject: 'Sàn đấu giá S_auction',
        text: 'Chạo bạn',
        html: `<p>Chào Bạn <b>${username}</b>,</p>
              <p>Sản phẩm: <b> ${product_name}</b> </p>
              <p>Tình trạng: <b>Sản phẩm đã được bán theo hình thức mua ngay</b></p>
              <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
              <div>Thân</div>`
      }
    },
  sendEmailBidderSuccessTemporaryBeforeAuction(
    emailReceive, username, product_name, product_id) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Sản phẩm: <b> ${product_name}</b> </p>
            <p>Tình trạng: <b>Có người ra giá cao hơn bạn</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailBidderSuccessWhenChangeDescription(
    product_id, name, emailReceive, full_name) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${full_name}</b>,</p>
            <p>Sản phẩm: <b> ${name}</b> </p>
            <p>Tình trạng: <b>Người bán đã cập nhật thông tin mô tả</b></p>
            <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
            <div>Thân</div>`
    }
  },
  sendEmailSellerWhenSomeOneAuctionProduct(
    emailReceive, username, bidder_name, product_name, product_id, cost) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
              <p>Sản phẩm đăng bán: <b> ${product_name}</b> </p>
              <p>Tình trạng: Ai đó đã đấu giá sản phẩm của bạn</p>
              <p>Người mua: <b>${bidder_name}</b></p>
              <p>Giá bán: <b>${cost} đ</b></p>
              <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
              <div>Thân</div>`
    }
  },
  sendEmailBidderWhenSellerRejectAuction(
    emailReceive, username, product_name, product_id) {
    return {
      from: 'sandaugiaduythien@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
              <p>Sản phẩm: <b> ${product_name}</b> </p>
              <p>Tình trạng: Người mua từ chối bạn được tham gia đấu giá</p>
              <p>Xem chi tiết tại đường dẫn: <a href="http://localhost:3000/product/detail?productid=${product_id}">ấn vô đây</a></p>
              <div>Thân</div>`
    }
  },

}