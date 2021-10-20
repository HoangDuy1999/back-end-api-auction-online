const db = require('../utils/db');
const { findByProductId } = require('./watch_list.model');
module.exports = {
  findAll() {
    return db.table('auction');
  },
  async findById(id) {
    const rows = await db.table('auction').where('auction_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findByProductId(product_id) {
    const rows = await db.table('auction').where('product_id', product_id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(auction) {
    const rs = await db.table('auction').insert(auction);
    return rs;
  },
  async patch(id, auction) {
    const rs = await db('auction').where('auction_id', id).update(auction);
    return rs;
  },
  async patchByProduct_id(id, auction) {
    const rs = await db('auction').where('product_id', id).update(auction);
    return rs;
  },
  del(id) {
    return db('auction').where('auction_id', id).del();
  },
  getAuctionExpired() {
    return db.select('p.*', 'a.current_cost','a.count_auction', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name', 
      'acc1.email as seller_email', 'acc2.full_name as bidder_name', 
      'acc2.email as bidder_email')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .whereRaw('TIMEDIFF(p.end_day, now()) <= ?', 0)
      .where('p.status', 1).andWhere('a.is_send_notification', 0);
  }
}