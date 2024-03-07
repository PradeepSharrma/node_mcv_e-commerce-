const express = require("express");
const address_route = express();

const bodyParser = require('body-parser');
address_route.use(bodyParser.json());
address_route.use(bodyParser.urlencoded({ extended: true }));

const address_contrller = require('../controllers/addressController');
const auth = require('../middlewre/auth')

address_route.post('/add-address',auth,address_contrller.add_address)

module.exports = address_route;



