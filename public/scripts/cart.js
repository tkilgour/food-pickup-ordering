const cart = {}
const cart.items = []

localStorage.setItem('cart', JSON.stringify(cart));

const addToCart = (product) => {
  // Retrieve the cart object from local storage
  if (localStorage && localStorage.getItem('cart')) {
    var cart = JSON.parse(localStorage.getItem('cart'));

    cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

$(() => {
  let product;
  let quantity = 0
  $('add-to-cart-button').on('click', (e) => {
    quantity += 1;
    const product = {};
    product.id = $('#item-details').attr('data-id');
    product.name = $('#item-details').attr('data-name');
    product.price = $('#item-details').attr('data-price');
    product.quantity = quantity;

    addToCart(product);
  })
});
