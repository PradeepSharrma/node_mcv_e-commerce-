const express = require("express");
const buy_product_route = express();

const bodyParser = require('body-parser');
buy_product_route.use(bodyParser.json());
buy_product_route.use(bodyParser.urlencoded({ extended: true }));

const buy_product_contrller = require('../controllers/buyProductController');
const auth = require('../middlewre/auth')

buy_product_route.post('/buy-product',auth,buy_product_contrller.buy_product)

buy_product_route.get('/get-product',auth,buy_product_contrller.get_product)

module.exports = buy_product_route;



