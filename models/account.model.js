const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.table('account');
  },
  async findById(id) {
    const rows = await db.table('account').where('account_id', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findByEmail(email) {
    const rows = await db('account').where('email', email);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findByRefreshToken(rf_token) {
    const rows = await db('account').where('rf_token', rf_token.trim());
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async add(account) {
      const rs = await db.table('account').insert(account);
      return rs;
  },
  async patch(id, account) {
      const rs = await db('account').where('account_id', id).update(account);
      return rs;
  },
  del(id) {
    return db('account').where('account_id', id).del();
  },
}