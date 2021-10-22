const jwt = require('jsonwebtoken');
const auctionModel = require('../models/auction_model');
const auctionDetailModel = require('../models/auction_detail_model');
const productModel = require('../models/product.model');
const accountModel = require('../models/account.model');
const rejectAuctionModel = require('../models/reject_auction_model');
const mail_server = require('../middlewares/server_mail_mdw');
module.exports = {
  handle_io(io) {
    // authencation
    io.use(function (socket, next) {
      //console.log(socket.handshake.query.token);
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.ACCESS_TOKEN_SECRET_KEY, function (err, decoded) {
          if (err) {
            return next(new Error('Authentication error'));
          }
          socket.decoded = decoded;
          next();
        });
      }
      else {
        next(new Error('Authentication error'));
      }
    })

    //listening
    io.on('connection', async (socket) => {
      // chức năng đấu giá
      socket.on("dau_gia_san_pham", async (data) => {
        const info = socket.decoded;
        if (info.role_id == 3) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Quản trị viên không có quyền đấu giá" });
        }
        const bidder_id = info.account_id;
        const info_account = await accountModel.findById(bidder_id);
        if (info_account == null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Đấu giá không thành công" });
        }
        if (info_account.evaluation_score < 8) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 407, account_id: bidder_id, message: "Điểm đánh giá không đủ 80%" });
        }
        //check data
        if (!data.product_id) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Thiếu trường product_id" });
        }
        if (isNaN(data.cost)) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Thiếu trường dữ liệu cost" });
        }
        // Lấy thông tin đấu giá
        const info_auction = await auctionModel.findByProductId(data.product_id);
        if (info_auction == null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Product_id không hợp lệ" });
        }
        if (info_auction.is_buy_now) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 406, account_id: bidder_id, message: "Sản phẩm đã bán theo hình thức mua ngay" });
        }
        //B2:Kiểm tra thông tin người mua có trong danh sách bị cấu đấu giá
        const info_reject_auction = await rejectAuctionModel.findByAuctionIdAndAccountId(
          info_auction.auction_id, bidder_id
        )
        if (info_reject_auction != null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 403, account_id: bidder_id, message: "Người bán cấm bạn đấu giá sản phẩm này" });
        }
        //B3: Kiểm tra xem đã có ai ra giá chưa
        //console.log(11111)
        const info_product_expied = await productModel.checkExpired(data.product_id);
        //  console.log(2222222);
        if (info_product_expied.length > 0) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 410, account_id: bidder_id, message: "Sản phẩm này đã hết hạn đấu giá" });
        }
        const info_product = await productModel.findById(data.product_id);
        if (info_product[0] == undefined) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Đấu giá sản phẩm không thành công" });
        }
        if (info_product[0].seller_id == bidder_id) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 409, account_id: bidder_id, message: "Bạn không được phép đấu giá chính sản phẩm của mình" });
        }
        // gia hạn
        //console.log((info_product[0].end_day - new Date())/1000);
        if ((info_product[0].end_day - new Date())/1000 <= 300) {
          var d1 = new Date(info_product[0].end_day);
          d2 = new Date(d1);
          d2.setMinutes(d1.getMinutes() + 10);
          // console.log(info_product[0].end_day);
          // console.log(d2);
          productModel.patch(info_product[0].product_id, {end_day: d2});
        }
        //console.log(info_product[0].product_id);
        //TH1: CHƯA AI RA GIÁ
        if (info_auction.bidder_id == null || info_auction.current) {
          const product_cost = parseFloat(info_product[0].start_cost); //+ parseFloat(info_product[0].step_cost);
          console.log(product_cost);
          if (data.cost < product_cost) {
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "giá đấu giá sản phẩm không hợp lệ." });
          }
          const rs = await auctionModel.patch(info_auction.auction_id, { bidder_id: bidder_id, current_cost: product_cost, count_auction: info_auction.count_auction + 1 });
          // console.log("rs  " + rs);
          if (!rs) {
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "giá đấu giá sản phẩm không hợp lệ." });
          } else {
            console.log("TH1");
            console.log("mail người bán:" + info_product[0].seller_email);
            console.log("mail người mua:" + info_account.email);
            await auctionDetailModel.add({ auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost, description: 'Đấu giá' });
          }
          mail_server.sendEmailSellerWhenSomeOneAuctionProduct(
            info_product[0].seller_email, info_product[0].seller_name, info_account.full_name,
            info_product[0].name, info_product[0].product_id, product_cost
          );
          mail_server.sendEmailBidderSuccessTemporaryAuction(
            info_account.email, info_account.full_name, info_product[0].seller_name,
            info_product[0].name, info_product[0].product_id, product_cost);
        } else {// TH2: ĐÃ CÓ NGƯỜI RA GIÁ
          // console.log(info_auction.current_cost);
          if (info_auction.bidder_id == bidder_id) {
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 408, account_id: bidder_id, message: "Bạn đánh là người giữ giá nên không cần đấu giá tiếp" });
          }
          const rs = await auctionDetailModel.findMaxCostByAuctionId(info_auction.auction_id);
          if (!rs[0]) {
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Đấu giá không thành công." });
          }
          const cost_now = parseFloat(rs[0].max_cost) + parseFloat(info_product[0].step_cost);
          if (data.cost <= parseFloat(rs[0].max_cost)) {
            // thêm vô auction_detail giá đó
            const result_temp = await auctionDetailModel.add({ auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost, description: 'Đấu giá' });
            //nếu thêm thành công
            if (result_temp) {
              // nêu giá này lơn hơn bidder_id thì cập nhật lại giá mua
              if (info_auction.current_cost < data.cost) {
                await auctionModel.patch(info_auction.auction_id, { current_cost: data.cost, count_auction: info_auction.count_auction + 1 });
              }
              const result = await auctionDetailModel.findMaxCostByAuctionId(info_auction.auction_id);
              return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 405, account_id: bidder_id, message: "Giá của bạn thấp hơn người giữ giá trước đó" });
            }
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Đấu giá không thành công." });
          }
          if (data.cost > parseFloat(rs[0].max_cost) && data.cost <= cost_now) {
            // thêm vô auction_detail giá đó
            const result_temp = await auctionDetailModel.add({ auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost, description: 'Đấu giá' });
            //nếu thêm thành công
            if (result_temp) {
              // nêu giá này lơn hơn bidder_id thì cập nhật lại giá mua
              if (info_auction.current_cost < data.cost) {
                await auctionModel.patch(info_auction.auction_id, { current_cost: parseFloat(rs[0].max_cost), count_auction: info_auction.count_auction + 1 });
              }
              const result = await auctionDetailModel.findMaxCostByAuctionId(info_auction.auction_id);
              return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 405, account_id: bidder_id, message: "Giá của bạn thấp hơn người giữ giá trước đó" });
            }
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "Đấu giá không thành công." });
          }

          const rs_auction = await auctionModel.patch(info_auction.auction_id, { bidder_id: bidder_id, current_cost: cost_now, count_auction: info_auction.count_auction + 1 });
          // console.log("rs  " + rs);
          if (!rs_auction) {
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status: 400, account_id: bidder_id, message: "giá đấu giá sản phẩm không hợp lệ." });
          } else {
            await auctionDetailModel.add({ auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost, description: 'Đấu giá' });
          }
          console.log("TH2");
          console.log("mail người bán:" + info_product[0].seller_email);
          console.log("mail người mua:" + info_account.email);
          console.log("người giữ giá trước đó" + info_auction.bidder_email);
          //người bán
          mail_server.sendEmailSellerWhenSomeOneAuctionProduct(
            info_product[0].seller_email, info_product[0].seller_name, info_account.full_name,
            info_product[0].name, info_product[0].product_id, cost_now
          );
          // người mua
          mail_server.sendEmailBidderSuccessTemporaryAuction(
            info_account.email, info_account.full_name, info_product[0].seller_name,
            info_product[0].name, info_product[0].product_id, cost_now);
          // người giữ giá trước đó
          mail_server.sendEmailBidderSuccessTemporaryBeforeAuction(info_auction.bidder_email,
            info_product[0].bidder_name, info_product[0].name, info_product[0].product_id);
        }
        // nếu thành công trả về kết quả
        io.emit("ket_qua_dau_gia_nguoi_mua", {
          status: 200, product_id: info_product[0].product_id, count_auction: info_auction.count_auction + 1,
          account_id: bidder_id, message: "Bạn ra giá thành công sản phẩm"
        });
        const infomation_auction = await auctionModel.findByProductId(info_product[0].product_id);
        const information_auction_detail = await auctionDetailModel.findAuctionId(info_auction.auction_id);

        io.emit('cap_nhat_giao_dien_xem_chi_tiet_san_pham_nguoi_ban', {
          status: 200,
          product_id: info_product[0].product_id, info_auction: infomation_auction,
          info_auction_detail: information_auction_detail
        })
      })

      socket.on("mua_ngay", async (data) => {
        const info = socket.decoded;
        const bidder_id = info.account_id;
        if (!data.product_id) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Thiếu trường product_id" });
        }
        if (isNaN(data.cost)) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Thiếu trường dữ liệu cost" });
        }
        const info_account = await accountModel.findById(bidder_id);
        if (info_account == null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Đấu giá không thành công" });
        }
        if (info_account.evaluation_score < 8) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 407, account_id: bidder_id, message: "Điểm đánh giá không đủ 80%" });
        }
        const info_auction = await auctionModel.findByProductId(data.product_id);
        if (info_auction == null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Product_id không hợp lệ" });
        }
        if (info_auction.is_buy_now) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 406, account_id: bidder_id, message: "Sản phẩm đã bán theo hình thức mua ngay" });
        }
        //B2:Kiểm tra thông tin người mua có trong danh sách bị cấu đấu giá
        const info_reject_auction = await rejectAuctionModel.findByAuctionIdAndAccountId(
          info_auction.auction_id, bidder_id
        )
        if (info_reject_auction != null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 403, account_id: bidder_id, message: "Người bán cấm bạn đấu giá sản phẩm này" });
        }
        const info_product_expied = await productModel.checkExpired(data.product_id);
        if (info_product_expied.length > 0) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 410, account_id: bidder_id, message: "Sản phẩm này đã hết hạn đấu giá" });
        }
        const info_product = await productModel.findById(data.product_id);
        if (info_product[0] == undefined) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Đấu giá sản phẩm không thành công" });
        }
        if (info_product[0].seller_id == bidder_id) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 409, account_id: bidder_id, message: "Bạn không được phép đấu giá chính sản phẩm của mình" });
        }
        if (info_product[0].buy_now != data.cost) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 411, account_id: bidder_id, message: "Giá mua ngay sản phẩm không hợp lệ" });
        }
        // cập nhật
        const rs_auction = await auctionModel.patch(info_auction.auction_id,
          { bidder_id: bidder_id, is_buy_now: 1, current_cost: info_product[0].buy_now });
        if (!rs_auction) {
          return io.emit("ket_qua_dau_gia_nguoi_mua_ngay", { status: 400, account_id: bidder_id, message: "Mua ngay không thành công" });
        }
        await auctionDetailModel.add({
          auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost,
          description: 'Mua Ngay'
        });
        // set het han san pham
        let today = new Date();
        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        today = date + ' ' + time;
        await productModel.patch(data.product_id, { end_day: today });
        //gửi mail
        console.log("mail người bán:" + info_product[0].seller_email);
        console.log("mail người mua:" + info_account.email);
        console.log("người giữ giá trước đó " + info_auction.bidder_email);
        //người bán
        mail_server.sendEmailSellerWhenSomeOneAuctionProduct(
          info_product[0].seller_email, info_product[0].seller_name, info_account.full_name,
          info_product[0].name, info_product[0].product_id, data.cost
        );
        // người mua
        mail_server.sendEmailBidderSuccessTemporaryAuction(
          info_account.email, info_account.full_name, info_product[0].seller_name,
          info_product[0].name, info_product[0].product_id, data.cost);
        if (info_auction.bidder_email != null) {
          // người giữ giá trước đó
          mail_server.sendEmailBidderSuccessTemporaryBeforeAuctionBuyNow(
            info_auction.bidder_email, info_product[0].bidder_name, info_product[0].name,
            info_product[0].product_id);
        }
        // nếu thành công trả về kết quả
        io.emit("ket_qua_dau_gia_nguoi_mua_ngay", {
          status: 200, product_id: info_product[0].product_id, count_auction: info_auction.count_auction + 1,
          account_id: bidder_id, message: "Bạn ra giá thành công sản phẩm"
        });
        const infomation_auction = await auctionModel.findByProductId(info_product[0].product_id);
        const information_auction_detail = await auctionDetailModel.findAuctionId(info_auction.auction_id);

        io.emit('cap_nhat_giao_dien_xem_chi_tiet_san_pham_nguoi_ban', {
          status: 200,
          product_id: info_product[0].product_id, info_auction: infomation_auction,
          info_auction_detail: information_auction_detail
        })
      });
      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnect`)
      })
    });
  }
}
