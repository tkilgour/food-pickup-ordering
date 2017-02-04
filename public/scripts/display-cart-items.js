  const roundMoney = (number) => {
  number = (Math.round(number * 100) / 100);
  return number;
}

const createCartItem = (cartItem) => {
  const $item = $(`
    <div class="row" id="cart-item">
      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
        <img class="img-responsive" src="http://placehold.it/120x80">
      </div>
      <div class="col-lg-7 col-md-6 col-sm-8 col-xs-12">
        <ul class="item-info">
          <li class="item-name">${cartItem.name}</li>
          <li class="item-price">$${cartItem.price}</li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-10 col-xs-2">
        <ul class="adjust-item">
          <li>
            <input id="edit-item-quantity" data-id="${cartItem.item_id}" type="number" class="form-control text-center" value="${cartItem.quantity}"></input>
          </li>
          <li>
            <form method="DELETE" action="/order/***ORDER ID">                  <!-- add order id variable -->
              <input type="button" class="delete-item" value="Remove" data-id="${cartItem.item_id}"></input>
            </form>
          </li>
        </ul>
      </div>
      <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-right">
        <span class="item-subtotal">$${roundMoney(cartItem.price * cartItem.quantity)}</span>
      </div>
    </div>
    `);
  return $item;
}

$(() => {
  if (localStorage.getItem('cart') === null) {
    $('.order').append(`
        <div class="row">
          <div class="col-12 text-center">
            Please select an item from the <a href="/user/menu">menu</a>.
          </div>
        </div>
      `)
    $('#checkout').attr('class', 'checkout-hidden')
  } else {
    const cartItems = JSON.parse(localStorage.getItem('cart')).products;
    let subTotal = 0;

    for (item in cartItems) {
      $('.order').append(createCartItem(cartItems[item]));
      // console.log(cartItems[item].price);
      subTotal += roundMoney(cartItems[item].price * cartItems[item].quantity);
    }

    const tax = subTotal * 0.13;
    const total = subTotal + tax;

    $('.order').append(`
      <div class="row">
      <div class="col-12 text-right">
      <p>Subtotal $${subTotal}</p>
      <p>Tax $${roundMoney(tax).toFixed(2)}</p>
      <p>Total $${roundMoney(total).toFixed(2)}</p>
      </div>
      </div>
      `);

  }


});
