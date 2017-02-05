//const twillio = require('/server/twillio');


$(document).ready(function () {
  let isEmpty = false;

  $('.txt-input').on('input blur', function() {
    let chars = $(this).val();

    if (!chars.trim()) {
      isEmpty = true;
    } else {
      isEmpty = false;
    }
  });



  $('.oid').on('submit', function(event) {
    event.preventDefault();

    let id = $(this).data('id');
    let val = Number($(this).find('.txt-input').val());

    const timeData = {
      id: id,
      val: val
    }

    if (isEmpty) {
      alert('Please enter time in minutes to continue.');
      return;
    }

    $.ajax('order_status', {
        method: 'post',
        data: timeData
    })
    .then(function() {
      $('.txt-input').val('');
    })
    .fail(function(error) {
      //display any errors
        console.error(error);
      });
  });
});
