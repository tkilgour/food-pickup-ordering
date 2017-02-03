exports.seed = function(knex, Promise) {
  //get the id in restaurant table
  function getId() {
  return knex('restaurant')
    .select('id')
    .where('name', 'like', 'C%');
  }


  // Deletes ALL existing entries
  return knex('products').del()
  .then(function() {
    return knex('restaurant').del()
      .then(function() {
          return knex('restaurant').insert({name: 'Carol\'s Cupcakes'})
            .then(function() {
              return knex('products').insert({
                restaurant_id: getId(),
                name: 'Chocolate Cupcake',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                price: 2.99
              });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Vanilla Cupcake',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                  price: 1.99
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Blueberry Cupcake',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                  price: 2.49
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Raspberry Cupcake',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                  price: 2.49
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Extreme Chocolate Cupcake',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                  price: 3.99
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Cinnamon Cupcake',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
                  price: 2.99
                });
            });
      });
  });
};
