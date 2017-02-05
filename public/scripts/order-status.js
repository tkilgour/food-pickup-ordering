
$(document).ready(function () {

  $('.oid').on('submit', function(event) {
    event.preventDefault();

    let id = $(this).data('id');
    let val = Number($(this).find('.txt-input').val());

    const timeData = {
      id: id,
      val: val
    }

    $.ajax('order_status', {
        method: 'post',
        data: timeData
    })
    .then(function() {
      $('.txt-input').val('');
      //$.ajax({url: '/admin/order_status'});
    })
    .fail(function(error) {
      //display any errors
        console.error(error);
      });
  });
});
