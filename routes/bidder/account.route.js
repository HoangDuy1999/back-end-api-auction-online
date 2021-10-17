const express = require('express');
const accountModel = require('../../models/account.model');
const validate = require('../../middlewares/validate.mdw');
const schema = require('../../schemas/account.schema.json');
const router = express.Router();
router.post('/requestUpgrade', async (req, res) => {
  if(req.pay_load.role_id != 1){
    return res.status(400).json({message: "Bạn không có quyền nâng cấp tài khoản"});
  }
  const account_id = req.pay_load.account_id;
  const rs = await accountModel.patch(account_id, {request_update: 1});
  if(!rs){
    return res.status(400).json({message: "Yêu cầu nâng cấp tài khoản không thành công"});
  }
  res.status(200).json({message: "Yêu cầu nâng cấp tài khoản thành công"});
});
module.exports = router;