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
                name: 'Marie Antoinette',
                description: 'We made our signature Marie Antoinette even more lovely! Fresh vanilla panna cotta, a light mousse made with clear maple syrup and classic macaron biscuits.',
                price: 2.99,
                image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2015/01/MAHEART_PRODUCT.jpg'
              });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'La Mancha',
                  description: 'La Mancha offers a delicate balance of textures and flavours. The saffron crème brulee, combined with a light honey mousse and a sweet blackberry coulis are rounded off with a delicious shortbread biscuit.',
                  price: 1.99,
                  image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12083NAD-MKG_LaMancha.jpg'
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Raspberry Tart',
                  description: 'Fresh raspberries filled with raspberry coulis adorn a vanilla custard and raspberry crème brulée filling.',
                  price: 2.49,
                  image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12100NAD-MKG_Raspberry.jpg'
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'C3',
                  description: 'Our favourite three C’s, chocolate, caramel and coconut, combined to make a delectable experience.',
                  price: 2.49,
                  image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12083NAD-MKG_C3.jpg'
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'Lemon Meringue Tart',
                  description: 'This classic tart has been elevated to a gourmet level with a crunchy pastry base filled with a smooth lemon cream.',
                  price: 3.99,
                  image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12100NAD-MKG_LemonMeringueCake.jpg'
                });
            }).then(function() {
                return knex('products').insert({
                  restaurant_id: getId(),
                  name: 'chocolate Cupcake',
                  description: ' Moist chocolate cake topped with rich chocolate icing and confetti sprinkles.',
                  price: 2.99,
                  image_url: 'https://static1.squarespace.com/static/517aaf16e4b0b2e0f183a30f/t/55ce6876e4b0983379371099/14395900525486/'
                });
            });
      });
  });
};
