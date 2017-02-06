
$(() => {
  $('#checkout').on('submit', (e) => {
    // e.preventDefault()
    let $cart = JSON.stringify(getCart())
    $.post({
      url: '/user/order',
      data: {
        cart: $cart
      }
    }).done(() => {
      localStorage.clear()
    });
    // $.ajax({url: '/user/:orderID'})
  })
});
