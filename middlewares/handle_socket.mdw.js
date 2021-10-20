const jwt = require('jsonwebtoken');
const auctionModel = require('../models/auction_model');
const auctionDetailModel = require('../models/auction_detail_model');
const productModel = require('../models/product.model');
const accountModel = require('../models/account.model');
const rejectAuctionModel = require('../models/reject_auction_model');
const auction_detail_model = require('../models/auction_detail_model');
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
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Quản trị viên không có quyền đấu giá" });
        }
        const bidder_id = info.account_id;
        //check data
        if (!data.product_id) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Thiếu trường product_id" });
        }
        if (isNaN(data.cost)) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Thiếu trường dữ liệu cost" });
        }
        // Lấy thông tin đấu giá
        const info_auction = await auctionModel.findByProductId(data.product_id);
        if (info_auction == null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Product_id không hợp lệ" });
        }
        if (info_auction.is_buy_now) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Sản phẩm đã bán theo hình thức mua ngay" });
        }
        //B2:Kiểm tra thông tin người mua có trong danh sách bị cấu đấu giá
        const info_reject_auction = await rejectAuctionModel.findByAuctionIdAndAccountId(
          info_auction.auction_id, bidder_id
        )
        if (info_reject_auction != null) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 403, account_id: bidder_id, message: "Người bán cấm bạn đấu giá sản phẩm này" });
        }
        //B3: Kiểm tra xem đã có ai ra giá chưa
        const info_product = await productModel.findById(data.product_id);
        if (info_product[0] == undefined) {
          return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Đấu giá sản phẩm không thành công" });
        }
        console.log(info_product[0].product_id);
        //TH1: CHƯA AI RA GIÁ
        if (info_auction.bidder_id == null || info_auction.current) {
          const product_cost = parseFloat(info_product[0].start_cost) + parseFloat(info_product[0].step_cost);
          if (data.cost < product_cost){
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "giá đấu giá sản phẩm không hợp lệ." });
          }
          const rs = await auctionModel.patch(info_auction.auction_id, {bidder_id: bidder_id, current_cost: product_cost });
          console.log("rs  " + rs);
          if(!rs){
            console.log("error");
            return io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "giá đấu giá sản phẩm không hợp lệ." });
          }else{
            console.log("running");
            await auctionDetailModel.add({auction_id: info_auction.auction_id, bidder_id: bidder_id, cost: data.cost});
          }
        }
        // TH2: ĐÃ CÓ NGƯỜI RA GIÁ
        //console.log(info_auction);
        io.emit("ket_qua_dau_gia_nguoi_mua", { status_code: 400, account_id: bidder_id, message: "Bạn ra giá thành công sản phẩm" });
      })
      //console.log(`${socket.id} connected`);
      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnect`)
      })
    });
  }
}
