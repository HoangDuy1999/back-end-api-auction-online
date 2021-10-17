const express = require('express');
const morgan = require('morgan');
const http = require('http');
const app = express();
const server = http.createServer(app);
const auth = require('./middlewares/auth.mdw');
const cors = require('cors')
require('express-async-errors');
require('dotenv').config();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/', async function(req, res){
  res.json({
    message: 'Hello online auction backend'
  });
})
// apis
app.use('/api/accounts', require('./routes/account.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/types', require('./routes/type.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/evaluation_historys', require('./routes/evaluation_history.route copy'));
//bidder
app.use('/api/bidder/watch_list', auth, require('./routes/bidder/watch_list.route'));
app.use('/api/bidder/account', auth, require('./routes/bidder/account.route'))
//seller
app.use('/api/seller/product', auth, require('./routes/seller/product.route'));
//admin
app.use('/api/admin/product', auth, require('./routes/admin/product.route'));
app.use('/api/admin/account', auth, require('./routes/admin/account.route'));
app.use('/api/admin/role', auth, require('./routes/admin/role.route'))

// socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
io.on('connection', (socket) => {
  socket.on("insert-auction", (data)=>{
    console.log(data);
  })
  console.log(`${socket.id} connected`);
  socket.on("disconnect", ()=>{
    console.log(`${socket.id} disconnect`)
  })
});


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

server.listen(PORT, ()=>{
  console.log(`Online auctiion backend is running at http://localhost:${PORT}`);
})