$(() => {
  const roundMoney = (number) => {
    number = (Math.round(number * 100) / 100);
    return number;
  }
  let subTotal = 0;

  // const cartItems = JSON.parse(localStorage.getItem('cart')).products;

  const createSubtotal = () => {
    const cartItems = localStorage.getItem('cart');
    if (cartItems) {
      products = JSON.parse(cartItems).products;
      for (item in products) {
        subTotal += products[item].price * products[item].quantity;
      }
    }
  }

  createSubtotal();

  if (subTotal == 0) {
    $('#total').append(0)
  } else {
    $('#total').append(roundMoney(subTotal * 1.13).toFixed(2));
  }

  $('.add-item').on('click', () => {
    subTotal = 0;
    createSubtotal();
    $('#total').html('').append(roundMoney(subTotal * 1.13).toFixed(2));
  });

});