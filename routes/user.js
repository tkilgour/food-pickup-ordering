"use strict";

const express        = require('express');
const router         = express.Router();
const async          = require('async');
const methodOverride = require('method-override'); //method overried to allow for put and delete

// const verify

module.exports = (knex) => {
  // Andrew - All routes will be prepended with /user ex. /user/menu
  // Andrew - GET request to query db and return all products and render them in menu formn
  router.get('/menu', (req, res) => {
    return knex('products')
      .select()
      .then((allProducts) => {
        const locals = {
          products: allProducts
        };
        console.log(locals.products);
        res.render('menu', locals);
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
  });
  // Andrew - Post request on order submission. Knex db insertion into orders table and
  // products_menu table.
  router.post('/order', (req, res) => {
    // const userID        = req.session.user_id
    const userID        = 1;
    const total         = req.body.total_price;
    const itemID1       = req.body.item_1
    const itemQuantity1 = req.body.item_1_quantity
    const itemID2       = req.body.item_2
    const itemQuantity2 = req.body.item_2_quantity
    const itemID3       = req.body.item_3
    const itemQuantity3 = req.body.item_3_quantity
    const itemID4       = req.body.item_4
    const itemQuantity4 = req.body.item_4_quantity
    const itemID5       = req.body.item_5
    const itemQuantity5 = req.body.item_5_quantity
    let order_id = ''

    const orderItems = [
      {
        item_id  : itemID1,
        quantity : itemQuantity1
      }, {
        item_id  : itemID2,
        quantity : itemQuantity2
      }, {
        item_id  : itemID3,
        quantity : itemQuantity3
      }, {
        item_id  : itemID4,
        quantity : itemQuantity4
      }, {
        item_id  : itemID5,
        quantity : itemQuantity5
      }
    ];
    async.waterfall([
      (callback) => {
        // Andrew - Inserts data into orders table and returns the order_id
        return knex('orders')
          .returning('id')
          .insert([{user_id: userID, total_price: total}])
          .then(response => callback(null, response))
          .catch(callback)
      },
      (data, callback) => {
        // Andrew - Sets the orderID, which gets called on redirect in the url. Order_id is added to
        // each item before insertion into product_order table.
        order_id = data[0]
        orderItems.map((orderItems) => {
          orderItems['order_id'] = order_id
        })
        return knex.batchInsert('product_orders', orderItems)
          .then(response => callback(null, "done"))
          .catch(callback);
      },
    ], (err, result) => {
      if(err){
        return console.log(`There was an error during database insertion of order. Error: ${err}`);
      } else {
        console.log(`Successfull order submission! The order_id is: ${order_id}`);
        res.redirect(`/user/${order_id}`);
      }
    });
  });
  // Andrew - Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    return knex('cart')
      .select()
      .then((cartItems) => {
        const locals = {cartItems: cartItems}
        res.render('cart', locals)
      })
      .catch((err) => {
        console.log('Database query to cart failed. Error: ', err);
      })
  })
  // Andrew - render specific order
  router.get('/:orderID', (req, res) => {
    const orderID = req.params.orderID
    if (!req.session.user_id || !orderID) {
      res.status(401)
    }
  })
  return router;
}
