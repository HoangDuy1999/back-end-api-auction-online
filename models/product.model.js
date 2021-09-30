const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.select('p.*', 'a.count_auction', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .where('p.status', '1')
  },
  findById(product_id) {
    return db.select('p.*', 'a.count_auction', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .where('p.status', '1').andWhere('p.product_id', product_id)
  },
  getInfoAuctioneer(product_id){
    return db.select('ad.*', 'ra.account_id', 'acc.full_name', 'ra.reason')
    .from('auction as a')
    .rightJoin('auction_detail as ad', 'a.auction_id', 'ad.auction_id')
    .leftJoin('reject_auction as ra', 'ra.auction_detail_id', 'ad.auction_detail_id')
    .leftJoin('account as acc', 'ra.account_id', 'acc.account_id')
    .where('a.product_id', product_id).andWhere('a.status', 1)

  },
  top_5_time_run_out() {
    return db.select('p.*', 'a.count_auction', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .whereRaw('TIMEDIFF(p.end_day, now()) > ?', 0)
      .where('p.status', 1)
      .orderBy('p.end_day', 'asc')
      .limit(5)
  },
  top_5_highest_cost(){
    return db.select('p.*', 'a.count_auction', 't.name as type_name', 't.alias as type_alias',
    'c.name as category_name', 'c.alias as category_alias',
    'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
    'acc2.full_name as bidder_name')
    .from('product as p')
    .leftJoin('auction as a', 'a.product_id', 'p.product_id')
    .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
    .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
    .leftJoin('type as t', 't.type_id', 'p.type_id')
    .leftJoin('category as c', 'c.category_id', 'p.category_id')
    .whereRaw('TIMEDIFF(p.end_day, now()) > ?', 0)
    .where('p.status', 1)
    .orderBy('p.start_cost ', 'desc')
    .limit(5)
  },
  top_5_highest_auction(){
    return db.select('p.*', 'a.count_auction', 't.name as type_name', 't.alias as type_alias',
    'c.name as category_name', 'c.alias as category_alias',
    'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
    'acc2.full_name as bidder_name')
    .from('auction as a')
    .leftJoin('product as p', 'p.product_id', 'a.product_id')
    .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
    .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
    .leftJoin('type as t', 't.type_id', 'p.type_id')
    .leftJoin('category as c', 'c.category_id', 'p.category_id')
    .whereRaw('TIMEDIFF(p.end_day, now()) > ?', 0)
    .where('p.status', 1)
    .orderBy('count_auction', 'desc')
    .limit(5)
  }


}