
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments('order_id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.users_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
