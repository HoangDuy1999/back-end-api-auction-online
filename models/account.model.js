const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.select("acc.*", "r.name as role_name")
    .from('account as acc')
    .leftJoin('role as r', 'acc.role_id', 'r.role_id');
  },
  findAllBidder() {
    return db.select("acc.*", "r.name as role_name")
    .from('account as acc')
    .leftJoin('role as r', 'acc.role_id', 'r.role_id')
    .where('acc.role_id', 1).andWhere('acc.request_update', 1);
  },
  async findById(id) {
    const rows = await db.select("acc.*", "r.name as role_name")
    .from("account as acc")
    .leftJoin('role as r', 'acc.role_id', 'r.role_id')
    .where('account_id', id);
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