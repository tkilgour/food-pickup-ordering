
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments().primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.decimal('total_price');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
