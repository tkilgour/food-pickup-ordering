const getCart = () => {
  if (!localStorage.getItem('cart')) {
    const cart = {}
    cart.products = []
    return cart;
  } else {
    return JSON.parse(localStorage.getItem('cart'));
  }
}

const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const addItem = (id, name, price) => {
  let cart = getCart();
  let matchingProduct = cart.products.findIndex((product) => {
    return product.item_id === id;
  })
  if (matchingProduct === -1) {
    const product = {};
    product.item_id = id;
    product.name = name;
    product.price = price;
    product.quantity = 1;
    cart.products.push(product)
  } else {
    cart.products[matchingProduct].quantity += 1;
  }
  setCart(cart)
}



// let products = JSON.parse(localStorage.cart)
