const express = require('express');
const morgan = require('morgan');
const http = require('http');
const app = express();
const server = http.createServer(app);
const auth = require('./middlewares/auth.mdw');
const cors = require('cors')
require('express-async-errors');
require('dotenv').config();
const autoCheckAuctionOver = require('./middlewares/auto_check_auction_over.mdw.js');
const handle_socket_io = require('./middlewares/handle_socket.mdw');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//autoCheckAuctionOver.Init();
app.get('/', async function (req, res) {
  const a = [
    {
      "Address": 25,
      "AlertType": 1,
      "Area": "North",
      "MeasureDate": "2019-02-01T00:01:01.001Z",
      "MeasureValue": -1
    },
    {
      "Address": 26,
      "AlertType": 1,
      "Area": "West",
      "MeasureDate": "2016-04-12T15:13:11.733Z",
      "MeasureValue": -1
    },
    {
      "Address": 25,
      "AlertType": 1,
      "Area": "North",
      "MeasureDate": "2017-02-01T00:01:01.001Z",
      "MeasureValue": -1
    }
  ];
  const rs = a.reduce((a, b) => {
    return new Date(a.MeasureDate) < new Date(b.MeasureDate) ? a : b;
  });
  console.log(rs);
  res.json({
    message: 'Hello online auction backend'
  });
})
// apis
app.use('/api/accounts', require('./routes/account.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/types', require('./routes/type.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/evaluation_historys', require('./routes/evaluation_history.route'));
//bidder
app.use('/api/bidder/watch_list', auth, require('./routes/bidder/watch_list.route'));
app.use('/api/bidder/account', auth, require('./routes/bidder/account.route'));
app.use('/api/bidder/product', auth, require('./routes/bidder/product.route'))
//seller
app.use('/api/seller/product', auth, require('./routes/seller/product.route'));
//admin
app.use('/api/admin/product', auth, require('./routes/admin/product.route'));
app.use('/api/admin/account', auth, require('./routes/admin/account.route'));
app.use('/api/admin/role', auth, require('./routes/admin/role.route'));
app.use('/api/admin/category', auth, require('./routes/admin/category.route'));

// socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
handle_socket_io.handle_io(io);
app.use(function (req, res, next) {
  res.status(404).json({
    err_message: 'Đỉa chị đường dẫn không hợp lệ.'
  });
})

//error-handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    message: 'Hệ thông đang gặp sự cố. Vui lòng thực hiện thao tác lại.'
  });
})
const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Online auctiion backend is running at http://localhost:${PORT}`);
})