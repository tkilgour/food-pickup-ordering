"use strict";

const express        = require('express');
const router         = express.Router();
const async          = require('async');
const methodOverride = require('method-override'); //method overried to allow for put and delete

module.exports = (knex) => {
  //Par - all routes prepended with /admin
  //Par - get /order_status will render the order status page for the employee checking on new orders

  router.get('/order_status', (req, res) => {
    const locals = {};
    return knex('orders')
      .innerJoin('users', 'orders.user_id', 'users.id')
      .select('orders.id', 'users.first_name', 'users.last_name', 'orders.total_price')
      .where('orders.complete', '=', true)
      .then(function(result) {
        locals.userOrders = result;
        //console.log(locals);
        //res.render('order_status', locals);
      }).then(function() {
          return knex('product_orders')
            .innerJoin('orders', 'product_orders.order_id', 'orders.id')
            .innerJoin('products', 'product_orders.item_id', 'products.id')
            .select('orders.id', 'products.name', 'products.price', 'product_orders.quantity')
            .where('orders.complete', '=', true)
            .then(function(result) {
              locals.prodOrders = result;
              console.log(locals);
              res.render('order_status', locals);
            });
      });
  });
  return router;
}
