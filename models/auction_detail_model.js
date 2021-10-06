const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('auction_detail');
  },
  async findById(id) {
    const rows = await db.table('auction_detail').where('auction_detail_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(auction_detail) {
    const rs = await db.table('auction_detail').insert(auction_detail);
    return rs;
  },
  async patch(id, auction_detail) {
    const rs = await db('auction_detail').where('auction_detail_id', id).update(auction_detail);
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