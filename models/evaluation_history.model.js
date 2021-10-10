const db = require('../utils/db');
module.exports = {
  async findByAccountId(id) {
    const rows = await db.select("ev.*", "acc1.full_name as name_account", "acc2.full_name as name_assessor")
    .from("evaluation_history as ev")
    .leftJoin('account as acc1', 'ev.account_id', 'acc1.account_id')
    .leftJoin('account as acc2', 'ev.assessor', 'acc2.account_id')
    .where('ev.account_id', id);
    return rows;
  },
}