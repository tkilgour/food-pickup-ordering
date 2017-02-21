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
        price: 36.99,
        image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2015/01/MAHEART_PRODUCT.jpg'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'La Mancha',
        description: 'La Mancha offers a delicate balance of textures and flavours. The saffron crème brulee, combined with a light honey mousse and a sweet blackberry coulis are rounded off with a delicious shortbread biscuit.',
        price: 36.99,
        image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12083NAD-MKG_LaMancha.jpg'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'Raspberry Tart',
        description: 'Fresh raspberries filled with raspberry coulis adorn a vanilla custard and raspberry crème brulée filling.',
        price: 40.99,
        image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12100NAD-MKG_Raspberry.jpg'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'C3',
        description: 'Our favourite three C’s, chocolate, caramel and coconut, combined to make a delectable experience.',
        price: 32.99,
        image_url: 'http://www.nadege-patisserie.com/wp-content/uploads/2012/11/SK12083NAD-MKG_C3.jpg'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'Lemon Meringue Tart',
        description: 'This classic tart has been elevated to a gourmet level with a crunchy pastry base filled with a smooth lemon cream.',
        price: 24.99,
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
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'Mont Blanc',
        description: 'A classic dessert, the Mont Blanc is filled with a delicate French meringue, cassis ganache, chantilly, almond cream, chestnut cream & an almond crust.',
        price: 36.00,
        image_url: '//www.nadege-patisserie.com/wp-content/uploads/2017/01/1b.jpg'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'Nutella Cupcake',
        description: 'Moist chocolate cake filled with Nutella, topped with Nutella buttercream and a Nutella dollop',
        price: 2.99,
        image_url: 'https://static1.squarespace.com/static/517aaf16e4b0b2e0f183a30f/t/55ce47c7e4b03e8de4103228/1439582157668/'
      });
  }).then(function() {
      return knex('products').insert({
        restaurant_id: getId(),
        name: 'Chocolate Raspbery Cupcake',
        description: 'Chocolate cake with Raspberry buttercream and chocolate sprinkles.',
        price: 2.99,
        image_url: '  https://static1.squarespace.com/static/517aaf16e4b0b2e0f183a30f/t/5891f26a2e69cfa51773c255/1485959873714/'
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
  });
};
