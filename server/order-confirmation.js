const knex = require('knex');

$(() => {
   console.log(knex('product_orders')
    .select());


});