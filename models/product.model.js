const db = require('../utils/db');
module.exports = {
  findAll(condition_end_day = false) {
    if (condition_end_day) {
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
        .orderBy('p.start_cost', 'asc')
    } else {
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
        .where('p.status', '1')
        .orderBy('p.start_cost', 'asc')
    }
  },
  search(textSearch) {
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
      .whereRaw(`TIMEDIFF(p.end_day, now()) > 0 and match(p.name, p.description) AGAINST('${textSearch}')`)
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', '1')
      .orderBy('p.start_cost', 'asc')
  },
  async patch(id, product) {
    const rs = await db('product').where('product_id', id).update(product);
    return rs;
  },
  findById(product_id) {
    return db.select('p.*', 'a.count_auction', 'a.is_buy_now', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc1.evaluation_score', 'acc1.email as seller_email', 'a.current_cost',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', '1').andWhere('p.product_id', product_id)
      //.whereRaw('TIMEDIFF(p.end_day, now()) > ?', 0)
  },
  findByIdNoCheckExpired(product_id) {
    return db.select('p.*', 'a.count_auction', 'a.is_buy_now', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc1.evaluation_score', 'acc1.email as seller_email',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .where('p.status', '1').andWhere('p.product_id', product_id)
  },
  checkExpired(product_id) {
    return db.select('p.*', 'a.count_auction', 'a.is_buy_now', 't.name as type_name', 't.alias as type_alias',
      'c.name as category_name', 'c.alias as category_alias',
      'a.auction_id as auction_id', 'a.bidder_id', 'acc1.full_name as seller_name',
      'acc1.evaluation_score', 'acc1.email as seller_email',
      'acc2.full_name as bidder_name')
      .from('product as p')
      .leftJoin('auction as a', 'a.product_id', 'p.product_id')
      .leftJoin('account as acc1', 'acc1.account_id', 'p.seller_id')
      .leftJoin('account as acc2', 'acc2.account_id', 'a.bidder_id')
      .leftJoin('type as t', 't.type_id', 'p.type_id')
      .leftJoin('category as c', 'c.category_id', 'p.category_id')
      .where('p.status', '1').andWhere('p.product_id', product_id)
      .whereRaw('TIMEDIFF(p.end_day, now()) <= ?', 0)
      
  },
  findImageByProductId(product_id) {
    return db.select('pi.image')
      .from('product_image as pi')
      .where('pi.status', '1').andWhere('pi.product_id', product_id)
  },
  findRelationCategory(category_id, product_id) {
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
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', '1').whereNotIn('p.product_id', [product_id])
      .andWhere('p.category_id', category_id)
      .limit(5)
      .orderBy('p.start_cost', 'asc')
  },
  findAllByType_Id(type_id, condition_end_day = false) {
    if (condition_end_day) {
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
        .where('p.status', '1').andWhere('p.type_id', type_id)
        .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
        .orderBy('p.start_cost', 'asc')
    } else {
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
        .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
        .where('p.status', '1').andWhere('p.type_id', type_id)
        .orderBy('p.start_cost', 'asc')
    }
  },
  getCategoryNameById(category_id) {
    return db.select("c.name").from("category as c")
      .where("c.category_id", category_id).andWhere("c.status", 1);
  },
  findAllByCategory_Id(category_id, condition_end_day = false) {
    if (condition_end_day) {
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
        .where('p.status', '1').andWhere('p.category_id', category_id)
        .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
        .orderBy('p.start_cost', 'asc')
    } else {
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
        .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
        .where('p.status', '1').andWhere('p.category_id', category_id)
        .orderBy('p.start_cost', 'asc')
    }
  },
  getInfoAuctioneer(product_id) {
    return db.select('ad.*', 'acc.full_name as bidder_name', 'eh.description as evaluation_value')//, 'ra.account_id', 'acc.full_name', 'ra.reason')
      .from('auction as a')
      .rightJoin('auction_detail as ad', 'a.auction_id', 'ad.auction_id')
    //  .rightJoin('reject_auction as ra', 'a.auction_id',  'ra.auction_id')
      .leftJoin('account as acc', 'ad.bidder_id', 'acc.account_id')
      .leftJoin('evaluation_history as eh',function() {
        this.on('ad.auction_id', '=', 'eh.auction_id')
        .andOn('ad.bidder_id', '=', 'eh.auction_id')
      })
      .where('a.product_id', product_id).andWhere('a.status', 1)
      //.andWhere('acc.account_id', 'eh.account_id')
  },
  getPostUnexpired(account_id) {
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
      .where('p.status', 1).andWhere('p.seller_id', account_id);
      // .orderBy('p.end_day', 'asc')
      // .limit(5)
  },
  getPostExpired(account_id) {
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
      .whereRaw('TIMEDIFF(p.end_day, now()) <= ?', 0)
      .where('p.status', 1).andWhere('p.seller_id', account_id);
      // .orderBy('p.end_day', 'asc')
      // .limit(5)
  },
  top_5_time_run_out() {
    console.log("run");
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
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', 1)
      .orderBy('p.end_day', 'asc')
      .limit(5)
  },
  top_5_highest_cost() {
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
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', 1)
      .orderBy('p.start_cost ', 'desc')
      .limit(5)
  },
  top_5_highest_auction() {
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
      .whereRaw('TIMEDIFF(p.start_day, now()) <= ?', 0)
      .where('p.status', 1)
      .orderBy('count_auction', 'desc')
      .limit(5)
  },
  async add(product) {
    const rs = await db.table('product').insert(product);
    return rs;
},

}