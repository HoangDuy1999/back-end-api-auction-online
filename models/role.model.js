const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table("role");
  },
  async findById(id) {
    const rows = await db.table('role_id').where('role_id_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(role_id) {
      const rs = await db.table('role_id').insert(role_id);
      return rs;
  },
  async patch(id, role_id) {
      const rs = await db('role_id').where('role_id_id', id).update(role_id);
      return rs;
  },
  del(id) {
    return db('role_id').where('role_id_id', id).del();
  },
}