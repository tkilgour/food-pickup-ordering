
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('menu_orders', function(table) {
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.order_id');
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('menu_items.items_id');
      table.integer('quantity');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menu_orders')
  ])
};
