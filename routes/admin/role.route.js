const express = require('express');
const roleModel = require('../../models/role.model');
//const schema = require('../../schemas/account.schema.json');
//const auth = require('../../middlewares/auth.mdw');
const router = express.Router();
router.get('/', async (req, res) => {
  if(req.pay_load.role_id != 3){
    return res.status(401).json({message: "Bạn không có quyền truy cập"});
  }
 // console.log(req.pay_load);
//  console.log(req.accessToken);
  const rs = await roleModel.findAll();
  res.status(200).json(rs);
});

module.exports = router;