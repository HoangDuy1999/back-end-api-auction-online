const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('type');
  },
  async findById(id) {
    const rows = await db.table('type').where('type_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(type) {
      const rs = await db.table('type').insert(type);
      return rs;
  },
  async patch(id, type) {
      const rs = await db('type').where('type_id', id).update(type);
      return rs;
  },
  del(id) {
    return db('type').where('type_id', id).del();
  },
}