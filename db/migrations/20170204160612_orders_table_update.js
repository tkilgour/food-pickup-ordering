
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.integer('time');
    table.timestamp('date_created').notNullable().defaultTo(knex.raw('now()'));
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
