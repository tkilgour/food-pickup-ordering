
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.integer('time');
    table.date('date_created');
    table.boolean('complete');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.dropColumn('time');
    table.dropColumn('date_created');
    table.dropColumn('complete');
  });
};
