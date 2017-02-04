// Andrew - When the remove button is clicked, the item will be deleted from localStorage
const deleteCartItem = (id) => {
  let cart = getCart();
  let matchingProduct = cart.products.findIndex((product) => {
    return product.item_id === id;
  })
  cart.products.splice(matchingProduct, 1);
  setCart(cart);
}

$(() => {
  $('.delete-item').on('click', (e) => {
    let id = $(e.target).data('id')
    // Andrew - Remove item from cart and then call deleteCartItem function. 
    $(e.target).closest('#cart-item').remove()
    deleteCartItem(id)
  })
})
