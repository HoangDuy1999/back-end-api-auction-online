const db = require('../utils/db');
module.exports = {
  async findById(id) {
    return db.select("wl.*", "pr.name as product_name", "pr.image as product_image",
      "pr.start_cost", "pr.step_cost", "pr.seller_id", "acc.full_name as seller_name",
      "t.name as type_name", "t.type_id", "c.name as category_name", "c.category_id")
      .from('watch_list as wl')
      .rightJoin('product as pr', 'wl.product_id', 'pr.product_id')
      .leftJoin("account as acc", "pr.seller_id", "acc.account_id")
      .leftJoin('type as t', 'pr.type_id', 't.type_id')
      .leftJoin('category as c', 'pr.category_id', 'c.category_id')
      .where('wl.status', 1).andWhere("wl.account_id", id);
  },
  async findByProductId(product_id) {
    return db.select("wl.*").from("watch_list as wl").where("wl.product_id", product_id)
    .andWhere("wl.status", 1);
  },
  async add(watch_list) {
    const rs = await db.table('watch_list').insert(watch_list);
    return rs;
  },
  async patch(id, watch_list) {
    const rs = await db('watch_list').where(id).update(watch_list);
    return rs;
  },
  del(condition) {
    return db('watch_list').where(condition).del();
  },
}