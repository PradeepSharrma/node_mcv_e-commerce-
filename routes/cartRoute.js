const express = require("express");
const cart_route = express();

const bodyParser = require('body-parser');
cart_route.use(bodyParser.json());
cart_route.use(bodyParser.urlencoded({ extended: true }));

const cart_contrller = require('../controllers/cartController');
const auth = require('../middlewre/auth')

cart_route.post('/add-to-cart',auth,cart_contrller.add_cart)

module.exports = cart_route;



