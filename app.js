const express = require('express');
const morgan = require('morgan');
const app = express();
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
// apis
app.use('/api/products', require('./routes/product.route'));

app.use(function (req, res, next) {
  res.status(404).json({
    err_message: 'Đỉa chị đường dẫn không hợp lệ.'
  });
})

//error-handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    err_message: 'Hệ thông đang gặp sự cố. Vui lòng thực hiện thao tác lại.'
  });
})
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
  console.log(`Online auctiion backend is running at http://localhost:${PORT}`);
})