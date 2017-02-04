
exports.up = function(knex, Promise) {
  return knex.schema.table('product_orders', function(table) {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('user_id');
};
