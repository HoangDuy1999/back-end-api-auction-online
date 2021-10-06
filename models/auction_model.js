const db = require('../utils/db');
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
}