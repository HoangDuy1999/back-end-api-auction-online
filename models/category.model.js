const db = require('../utils/db');
module.exports = {
  findAll() {
    return db.select("c.*", "t.name as type_name")
    .from('category as c')
    .leftJoin('type as t', 'c.type_id', 't.type_id')
    .where('c.status', 1);
  },
  async findById(id) {
    const rows = await db.select("c.*", "t.name as type_name")
    .from('category as c')
    .leftJoin('type as t', 'c.type_id', 't.type_id')
    .where('c.status', 1).andWhere("c.category_id", id);
    console.log(id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  async findByType(id) {
    const rows = await db.select("c.*")
    .from('category as c')
    .where('c.status', 1).andWhere("c.type_id", id);
    return rows;
  },
  async add(category) {
      const rs = await db.table('category').insert(category);
      return rs;
  },
  async patch(id, category) {
      const rs = await db('category').where('category_id', id).update(category);
      return rs;
  },
  del(id) {
    return db('category').where('category_id', id).del();
  },
}