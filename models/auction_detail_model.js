const { select } = require('async');
const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('auction_detail');
  },
  findMaxCostByAuctionId(auction_id){
     return db.select('ad.bidder_id')
     .from('auction_detail as ad')
     .max({ max_cost: ['ad.cost'] })
     .where('ad.status', 1);
  },
  async findById(id) {
    const rows = await db.table('auction_detail').where('auction_detail_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findAuctionId(auction_id) {
    const rows = await db.select('ad.*', 'acc.full_name')
    .from ('auction_detail as ad')
    .leftJoin('account as acc', 'ad.bidder_id', 'acc.account_id')
    .where('ad.auction_id', auction_id)
    .andWhere('ad.status', 1);
    return rows;
  },
  async findAllByAuctionIdAndRejectId(auction_id, reject_id) {
    const rows = await db.select('ad.*', 'acc.full_name')
    .from ('auction_detail as ad')
    .leftJoin('account as acc', 'ad.bidder_id', 'acc.account_id')
    .where('ad.auction_id', auction_id)
    .andWhere('ad.status', 1)
    .orderBy([{ column: 'cost', order: 'desc' }])
    .whereNot('ad.bidder_id', reject_id);

    return rows;
  },
  async add(auction_detail) {
    const rs = await db.table('auction_detail').insert(auction_detail);
    return rs;
  },
  async patch(id, auction_detail) {
    const rs = await db('auction_detail').where('auction_detail_id', id).update(auction_detail);
    return rs;
  },
  async patchByAuctionAndAccountId(auction_id, account_id, auction_detail) {
    const rs = await db('auction_detail').where('auction_id', auction_id).
    andWhere('bidder_id', account_id).update(auction_detail);
    return rs;
  },
  async patchByProduct_id(id, auction_detail) {
    const rs = await db('auction_detail').where('product_id', id).update(auction_detail);
    return rs;
  },
  del(id) {
    return db('auction_detail').where('auction_detail_id', id).del();
  },
}