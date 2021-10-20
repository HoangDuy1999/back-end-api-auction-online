const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('reject_auction');
  },
  async findById(id) {
    const rows = await db.table('reject_auction').where('reject_auction_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findByAuctionIdAndAccountId(auction_id, acount_id) {
    const rows = await db.table('reject_auction').
    where('auction_id', auction_id).andWhere('account_id', acount_id)
    .andWhere('status', 1);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(reject_auction) {
    const rs = await db.table('reject_auction').insert(reject_auction);
    return rs;
  },
  async patch(id, reject_auction) {
    const rs = await db('reject_auction').where('reject_auction_id', id).update(reject_auction);
    return rs;
  },
  async patchByProduct_id(id, reject_auction) {
    const rs = await db('reject_auction').where('product_id', id).update(reject_auction);
    return rs;
  },
  del(id) {
    return db('reject_auction').where('reject_auction_id', id).del();
  },
}