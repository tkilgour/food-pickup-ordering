"use strict";

const express        = require('express');
const router         = express.Router();
const async          = require('async');
const methodOverride = require('method-override'); //method overried to allow for put and delete

// Andrew - Takes in localStorage and creates and array with item_id and item_quantity
const createOrder = (cart) => {
  const order = []
  cart.products.forEach((product) => {
    order.push(
      {
        item_id: product.item_id,
        quantity: product.quantity
      }
    )
  })
  return order;
}
// Andrew - Calculates total
const calculateTotal = (cart) => {
  let total = 0;
  cart.products.forEach((product) => {
    total += (product.price * product.quantity)
  })
  // Andrew - The total will not be rounded before database insertion
  return total * 1.13;
}

// Andrew - All routes will be prepended with /user ex. /user/menu
module.exports = (knex) => {
  // Andrew - GET request to query db and return all products and render them in menu formn
  router.get('/menu', (req, res) => {
    return knex('products')
      .select()
      .then((allProducts) => {
        const locals = {
          products: allProducts
        };
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
    const cart          = JSON.parse(req.body.cart)
    const total         = calculateTotal(cart)
    const orderItems    = createOrder(cart)
    let order_id;
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
    res.render('cart')
  })

  const findItemID = (productList) => {
    let productArray = []
    productList.forEach((product) => {
      arr.push(product.item_id)
    })
    console.log('THIS IS THE ARR', arr);
    return productArray;
  }

  // Andrew - render specific order
  router.get('/:orderID', (req, res) => {
    const orderID = Number(req.params.orderID)

    return knex.from('product_orders')
      .innerJoin('orders', 'product_orders.order_id', 'orders.id')
      .innerJoin('products', 'product_orders.item_id', 'products.id')
      .select(orderID, 'products.name', 'products.price', 'product_orders.quantity', 'orders.time')
      .where('order_id', '=', orderID)
      .then((allProducts) => {
        const locals = {
          products: allProducts,
          orderID: orderID
        };
          res.render('order_confirmation', locals);
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
      res.render('order_confirmation', orderConfirm);
  })
  return router;
}
