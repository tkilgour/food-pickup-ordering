const addToCart = (product) => {
  // Retrieve the cart object from local storage
  if (localStorage && localStorage.getItem('cart')) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

$(() => {
  $('#shopping-cart').text('')
  const cart = {}

  cart.products = []

  localStorage.setItem('cart', JSON.stringify(cart));

  let quantity = 0
  let cartItemCount = 0;

  $('.add-item').on('click', (e) => {
    let element = $(e.target);
    let item = element.closest('#item-details');
    cartItemCount += 1
    console.log("Button clicked");
    console.log(cartItemCount);
    $('#shopping-cart').text(cartItemCount)
    quantity += 1;
    const product = {};
    product.id = item.data('id');
    product.name = item.data('name');
    product.price = item.data('price');
    product.quantity = quantity;

    addToCart(product);
  })
});

// let products = JSON.parse(localStorage.cart)
