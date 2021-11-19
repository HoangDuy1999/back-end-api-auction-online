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
     .where('ad.status', 1)
     .andWhere('ad.auction_id', auction_id)
  },
  async findById(id) {
    const rows = await db.table('auction_detail').where('auction_detail_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findEmailByProductId(product_id){
    return db.select('acc.email','acc.full_name', 'p.name', 'p.product_id')
    .from('auction as a')
    .leftJoin('auction_detail as ad', 'a.auction_id', 'ad.auction_id')
    .leftJoin('account as acc', 'ad.bidder_id', 'acc.account_id')
    .leftJoin('product as p', 'p.product_id', 'a.product_id')
    .where('ad.status', 1)
    .andWhere('a.product_id', product_id);
  },
  async findHistoryAuctionBidder(account_id){
    return db
    .distinct('ad.auction_id', 'a.bidder_id', 'a.count_auction','a.product_id', 'a.current_cost',
    'acc1.full_name as bidder_name', 'p.name', 'p.seller_id', 'acc2.full_name as seller_name',
    'p.start_cost', 'p.start_day', 'p.image', 'p.end_day')
    .from('auction_detail as ad')
    .leftJoin('auction as a', 'ad.auction_id', 'a.auction_id')
    .leftJoin('account as acc1', 'a.bidder_id', 'acc1.account_id')
    .leftJoin('product as p', 'a.product_id', 'p.product_id')
    .leftJoin('account as acc2', 'p.seller_id', 'acc2.account_id')
    .where('ad.status', 1).andWhere('ad.bidder_id', account_id)
    .whereRaw('TIMEDIFF(p.end_day, now()) <= ?', 0)
  },
  async findHistoryAuctionProgressBidder(account_id){
    return db
    .distinct('ad.auction_id', 'a.bidder_id', 'a.count_auction','a.product_id', 'a.current_cost',
    'acc1.full_name as bidder_name', 'p.name', 'p.seller_id', 'acc2.full_name as seller_name',
    'p.start_cost', 'p.start_day', 'p.image', 'p.end_day')
    .from('auction_detail as ad')
    .leftJoin('auction as a', 'ad.auction_id', 'a.auction_id')
    .leftJoin('account as acc1', 'a.bidder_id', 'acc1.account_id')
    .leftJoin('product as p', 'a.product_id', 'p.product_id')
    .leftJoin('account as acc2', 'p.seller_id', 'acc2.account_id')
    .where('ad.status', 1).andWhere('ad.bidder_id', account_id)
    .whereRaw('TIMEDIFF(p.end_day, now()) > ?', 0)
  },
  async findAuctionId(auction_id) {
    const rows = await db.select('ad.*', 'acc.full_name', 'eh.description as evaluation_value')
    .from ('auction_detail as ad')
    .leftJoin('account as acc', 'ad.bidder_id', 'acc.account_id')
    .leftJoin('evaluation_history as eh',function() {
      this.on('ad.auction_id', '=', 'eh.auction_id')
      .andOn('ad.bidder_id', '=', 'eh.auction_id')
    })
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