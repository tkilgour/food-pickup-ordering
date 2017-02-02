"use strict";

const express        = require('express');
const router         = express.Router();
const async          = require('async');
const methodOverride = require('method-override'); //method overried to allow for put and delete

module.exports = (knex) => {
  // Andrew - All routes will be prepended with /user ex. /user/menu
  // Andrew - GET request to query db and return all products and render them in menu formn
  router.get('/menu', (req, res) => {
    return knex('Products')
      .select()
      .then((allProducts) => {
        const locals = {
          products: allProducts
        };
        res.render("menu", locals);
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
  });
  // Andrew - Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    res.render('cart')
  })
  // Andrew - Post for when user add item to cart
  router.post('/cart', (req, res) => {

  })
  // Andrew - Update item quantity in cart
  router.put('/cart/:itemID', (req, res) => {

  });
  // Andrew - Delete item from cart
  router.delete('/cart/:itemID', (req, res) => {

  });
  // Andrew - Post request on order submission. Knex db insertion into orders table and
  // products_menu table.
  router.post('/:orderID', (req, res) => {
    const userID        = req.session.user_id;
    const total         = req.body.total_price;
    const item          = req.body.item;
    const itemID1       = item_1
    const itemQuantity1 = item_1_quantity
    const itemID2       = item_2
    const itemQuantity2 = item_2_quantity
    const itemID3       = item_3
    const itemQuantity3 = item_3_quantity
    const itemID4       = item_4
    const itemQuantity4 = item_4_quantity
    const itemID5       = item_5
    const itemQuantity5 = item_5_quantity
    const itemID6       = item_6
    const itemQuantity6 = item_6_quantity

    const itemArr = [
      {
        item_id  : itemID1,
        quantity : itemQuantity1
      }, {
        itemID2  : itemQuantity2,
        quantity : itemQuantity2
      }, {
        itemID3  : itemQuantity3,
        quantity : itemQuantity3
      }, {
        itemID3  : itemQuantity4,
        quantity : itemQuantity4
      }, {
        itemID3  : itemQuantity5,
        quantity : itemQuantity5
      }, {
        itemID3  : itemQuantity6,
        quantity : itemQuantity6
      }
    ];
    async.waterfall([
      (callback) => {
        return knex('orders')
          .returning('order_id')
          .insert([{user_id: userID, total: total}])
          .then(response => callback(null, response))
          .catch(callback)
      },
      (data, callback) => {
        const order_id = data[0]
        const newArrWithOrderID = itemArr.map((val) => {
          val['order_id'] = order_id
        })
        return knex.batchInsert('orders_products', newArrWithOrderID)
          .then(response => callback(null, "done"))
          .catch(callback)
      },
    ], (err, result) => {
      if(err){
        return console.log(`There was an error during database insertion of order. Error: ${err}`);
      } else {
        console.log('Successfull order submission!');
        res.redirect('/user/:orderID');
      }
    });

  })
  // render specific order
  router.get('/:orderID', (req, res) => {
    const orderID = req.params.orderID
    if (!req.session.user_id || !orderID) {
      res.status(401).
    }
  })
  return router;
}
