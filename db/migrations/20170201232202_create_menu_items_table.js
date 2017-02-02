
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments().primary();
      table.integer('restaurant_id').unsigned()
      table.foreign('restaurant_id').references('restaurant.id');
      table.string('name');
      table.string('description');
      table.decimal('price');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
