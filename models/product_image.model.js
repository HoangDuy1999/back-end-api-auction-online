const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('product_image');
  },
  async findById(id) {
    const rows = await db.table('product_image').where('product_image_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(product_image) {
      const rs = await db.table('product_image').insert(product_image);
      return rs;
  },
  async patch(id, product_image) {
      const rs = await db('product_image').where('product_image_id', id).update(product_image);
      return rs;
  },
  del(id) {
    return db('product_image').where('product_image_id', id).del();
  },
}