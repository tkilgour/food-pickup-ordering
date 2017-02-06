
$(() => {
  $('#checkout').on('submit', (e) => {
    e.preventDefault()
    let $cart = JSON.stringify(getCart())
    $.post({
      url: '/user/order',
      data: {
        'cart': $cart
      },
      success:(data) => {
        // $.get(data.url)
        window.location.replace(data.url)
        localStorage.clear()
      }
    })
  })
});
