// Andrew - When user logs out, local storage will be cleared
// Andrew - ES6 way of writing $(document)...
$(() => {
  $('#logout').on('click', (e) => {
    localStorage.clear();
  })
});
