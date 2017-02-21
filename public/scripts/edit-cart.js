// Andrew - Function for editing items in cart
const editCart = (id, quantity) => {
  console.log("quantity and id", id, quantity);
  let cart = getCart()
  let matchingProduct = cart.products.findIndex((product) => {
    return product.item_id === id;
  })
  // Andrew - If new quantity is > 0, quantity will be updated
  if (quantity > 0) {
    cart.products[matchingProduct].quantity = quantity;
    // Andrew - Will delete item if quantity === 0
  } else {
    cart.products.splice(matchingProduct, 1);
  }
  setCart(cart);
};

$(() => {
  $('#edit-item-quantity').on('click', (e) => {
    $(e.target).on('change', (e) => {
      let quantity = $(e.target).val();
      let item = $(e.target).closest('#edit-item-quantity');
      editCart(item.data('id'), quantity);
    })
  })
});
