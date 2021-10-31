const db = require('../utils/db');
module.exports = {
  async findByAccountId(id) {
    const rows = await db.select("ev.*", "auct.product_id", "pr.name as product_name", "pr.image", "acc1.full_name as name_account", "acc2.full_name as name_assessor")
    .from("evaluation_history as ev")
    .leftJoin('account as acc1', 'ev.account_id', 'acc1.account_id')
    .leftJoin('account as acc2', 'ev.assessor', 'acc2.account_id')
    .leftJoin('auction as auct', 'ev.auction_id', 'auct.auction_id')
    .leftJoin('product as pr', 'auct.product_id', 'pr.product_id')
    .where('ev.account_id', id);
    return rows;
  },
  findByAccountAndAssensor(bidder_id, seller_id){
    return db.select('eh.description')
    .from('evaluation_history as eh')
    .where('eh.assessor', bidder_id)
    .andWhere('eh.account_id', seller_id)
  },
  async add(evaluation) {
    const rs = await db.table('evaluation_history').insert(evaluation);
    return rs;
},
}