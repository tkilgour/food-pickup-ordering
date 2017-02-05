"use strict";

const express        = require('express');
const router         = express.Router();
const async          = require('async');
const methodOverride = require('method-override'); //method overried to allow for put and delete
const twilio         = require('../server/twilio');

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
      }).then(function() {
          return knex('product_orders')
            .innerJoin('orders', 'product_orders.order_id', 'orders.id')
            .innerJoin('products', 'product_orders.item_id', 'products.id')
            .select('orders.id', 'products.name', 'products.price', 'product_orders.quantity')
            .where('orders.complete', '=', true)
            .then(function(result) {
              locals.prodOrders = result;
              res.render('order_status', locals);
            });
      });
  });

  router.post('/order_status', (req, res) => {
    const oid = req.body.id;
    const time = req.body.val;

    return knex('orders')
      .where('orders.id', '=', oid)
      .update({time: time})
      .then(function() {
        const sms = {};
        return knex('orders')
          .innerJoin('users', 'orders.user_id', 'users.id')
          .select('users.first_name', 'orders.time')
          .where('orders.id', '=', oid)
          .then(function(result) {
            sms.user = result;
          }).then(function() {
            //console.log(sms.prod);
            twilio.message(sms.user[0].first_name, 'Carol\'s Cupcakes', sms.user[0].time, 'http://www.cupcakes.com');
          });
      })
      .then(function() {
        res.redirect('order_status');
      });
  });
  return router;
}
