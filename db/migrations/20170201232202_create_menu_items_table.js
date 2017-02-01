
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('menu_items', function(table) {
      table.increments('items_id').primary();
      table.integer('restaurant_id').unsigned();
      table.foreign('restaurant_id').references('restaurant.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menu_items')
  ])
};
