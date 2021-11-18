const express = require('express');
const evaluationHistoryModel = require('../models/evaluation_history.model');
const schema = require('../schemas/evaluation_history.schema.json');
const evaluation_historyModel = require('../models/evaluation_history.model');
const validate = require('../middlewares/validate.mdw');
const validate_email = require('../middlewares/validate_email.mdw');
const auth = require('../middlewares/auth.mdw');
const accountModel = require('../models/account.model');
const router = express.Router();

router.get('/:account_id', async (req, res) => {
  const account_id = req.params.account_id || 0;
  const rs = await evaluationHistoryModel.findByAccountId(account_id);
  res.status(200).json(rs);
});

router.get('/', validate(schema, ["account_id"]), async (req, res) => {
  const account_id = req.body.account_id;
  const rs = await evaluationHistoryModel.findByAccountId(account_id);
  res.status(200).json(rs);
});

router.post('/', auth, validate(schema, ["account_id", "score", "auction_id", "description"]),async (req, res) => {
  const data = req.body;
  const account_id = data.account_id || 0;
  data.assessor = req.pay_load.account_id;
  const rs_acc = await accountModel.findById(account_id);
  if(rs_acc == null){
    res.status(400).json({message: "thêm lịch sử đánh giá không thành công"});
  }
  let score = rs_acc.evaluation_score;
  if(rs_acc.evaluation_score + data.score > 10){
    score = 10;
  }
  else if(rs_acc.evaluation_score + data.score < 0){
    score = 0;
  }else{
    score = rs_acc.evaluation_score + data.score;
  }
  const rs_u_acc = accountModel.patch(account_id, {evaluation_score: score});
  if(!rs_u_acc){
    res.status(400).json({message: "thêm lịch sử đánh giá không thành công"});
  }
  await evaluation_historyModel.add(data);
  res.status(200).json({message: "thêm lịch sử đánh giá thành công"});
});



module.exports = router;