### Run server
#### 1. npm i
#### 2. npm start
### password default account
#### passwd: sandaugia
#### Mã lỗi đấu giá
400: dau gia khong thanh cong
403: bị cấm đấu giá
405: giá bạn thấp hơn sản phẩm trước đó
406: sản phẩm bán theo hình thức mua ngay
407: điểm đánh giá của bạn bé hơn 80 %
408: bạn đang là nguoi giu gia
409: không được phép đấu giá sản phẩm của chính mình
410: het han dau gia
200: thành công
#### Mã lỗi mua ngay
400: dau gia khong thanh cong
403: bị cấm đấu giá
406: sản phẩm bán theo hình thức mua ngay
407: điểm đánh giá của bạn bé hơn 80 %
408: bạn đang là nguoi giu gia
409: không được phép đấu giá sản phẩm của chính mình
410: het han dau gia
411: giá mua ngay ko hop lệ
200: thành công

#### NGƯỜI MUA
- Lấy lịch sử đấu giá: những sản phẩm mình có đấu giá và đã kết thúc
Get: http://localhost:3002/api/bidder/product/history_auction
- Lấy danh sách sản phẩm đang đấu giá mà mình có tham gia và chưa kết thúc:
Get: http://localhost:3002/api/bidder/product/auction_progress

#### NGƯỜI BÁN
##### ĐẤU GIÁ
- LẤY DANH SÁCH BÀI ĐĂNG ĐẤU GIÁ CÒN HẠN:
Get: http://localhost:3002/api/seller/product/post_unexpired
- LẤY DANH SÁCH SẢN PHẨM MÌNH ĐANG ĐẤU GIÁ CHƯA KẾT THÚC: dùng api của bidder vì seller là nâng cấp của bidder
Get: http://localhost:3002/api/bidder/product/auction_progress
#### Lịch sử đấu giá
- LẤY DANH SÁCH BÀI ĐĂNG ĐÃ HẾT HẠN
GET: http://localhost:3002/api/seller/product/post_expired
- LẤY DANH SÁCH SẢN PHẨM MÌNH ĐẤU GIÁ ĐÃ KẾT THÚC: dùng api của bidder vì seller là nâng cấp của bidder
Get: http://localhost:3002/api/bidder/product/history_auction

