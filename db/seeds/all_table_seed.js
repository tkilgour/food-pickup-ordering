exports.seed = function(knex, Promise) {
  //get the id in restaurant table
  function getId() {
    return knex('restaurant')
      .select('id')
      .where('name', 'like', 'C%');
  }

  function getUId(char) {
    return knex('users')
      .select('id')
      .where('first_name', '=', char);
  }

  function getOId(price) {
    return knex('orders')
      .select('id')
      .where('total_price', '=', price);
  }

  function getPId(name) {
    return knex('products')
      .select('id')
      .where('name', '=', name);
  }

  // Deletes ALL existing entries
  return knex('product_orders').del()
  .then(function() {
    return knex('products').del()
  }).then(function() {
      return knex('orders').del()
  }).then(function() {
      return knex('restaurant').del()
  }).then(function() {
      return knex('users').del()
    //seed the restaurant table
  }).then(function() {
      return knex('restaurant').insert({
        name: 'Carol\'s Cupcakes'
      });
    //seed products table
  }).then(function() {
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
        name: 'Chocolate Cupcake',
        description: ' Moist chocolate cake topped with rich chocolate icing and confetti sprinkles.',
        price: 2.99,
        image_url: 'https://static1.squarespace.com/static/517aaf16e4b0b2e0f183a30f/t/55ce6876e4b0983379371099/14395900525486/'
      });
      //seed users table
  }).then(function() {
      return knex('users').insert({
        first_name: 'James',
        last_name: 'Bond',
        phone: '14165555555'
      });
  }).then(function() {
      return knex('users').insert({
        first_name: 'Luke',
        last_name: 'Skywalker',
        phone: '16475555555'
      });
  }).then(function() {
      return knex('users').insert({
        first_name: 'Jacen',
        last_name: 'Solo',
        phone: '12895555555'
      });
      //seed orders table
  }).then(function() {
      return knex('orders').insert({
        user_id: getUId('James'),
        total_price: 15.93,
        time: 20,
        date_created: '2017-02-03',
        complete: true
      });
  }).then(function() {
      return knex('orders').insert({
        user_id: getUId('Luke'),
        total_price: 8.47,
        time: 20,
        date_created: '2017-02-02',
        complete: false
      });
  }).then(function() {
      return knex('orders').insert({
        user_id: getUId('Jacen'),
        total_price: 14.93,
        time: 20,
        date_created: '2017-02-05',
        complete: false
      });
      //seed product_orders table
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(15.93),
        item_id: getPId('La Mancha'),
        quantity: 3,
      });
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(15.93),
        item_id: getPId('C3'),
        quantity: 4,
      });
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(8.47),
        item_id: getPId('Chocolate Cupcake'),
        quantity: 2,
      });
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(8.47),
        item_id: getPId('Raspberry Tart'),
        quantity: 1,
      });
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(14.93),
        item_id: getPId('La Mancha'),
        quantity: 5,
      });
  }).then(function() {
      return knex('product_orders').insert({
        order_id: getOId(14.93),
        item_id: getPId('C3'),
        quantity: 2,
      });
  });
};
