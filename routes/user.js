"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


// All routes will be prepended with /user ex. /user/menu
// GET request to query db and return all products and render them in menu formn
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

  return router;
}
