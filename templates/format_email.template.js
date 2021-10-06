module.exports = {
  otpSignUp(emailReceive, username, otp) { // thiết lập đối tượng, nội dung gửi mail
    return {
      from: 'tranhoangduy.911@gmail.com',
      to: emailReceive,
      subject: 'Sàn đấu giá S_auction',
      text: 'Chạo bạn',
      html: `<p>Chào Bạn <b>${username}</b>,</p>
            <p>Để xác nhận bạn xác nhận đăng ký tài khoản tại website đấu giá <b>S_auction</b> </p>
            <p>MãOTP: <b>${otp}</b></p>
            <div style="color: red;  font-style: italic;">Vui lòng không cung cấp mã OTP này cho ai khác. Xin cảm ơn! </div>
            <div>Chào bạn</div>
            `
    }
  }
}