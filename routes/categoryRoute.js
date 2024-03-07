const express = require("express");
const category_route = express();

const bodyParser = require('body-parser');
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({ extended: true }));

const category_contrller = require('../controllers/categoryController');
const auth = require('../middlewre/auth')

category_route.post('/add-category',auth,category_contrller.add_category)

module.exports = category_route;



