
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      return knex('restaurant').insert({name: 'Carol\'s Cupcakes'});
    });
};
