const express = require("express");
const sub_category_route = express();

const bodyParser = require('body-parser');
sub_category_route.use(bodyParser.json());
sub_category_route.use(bodyParser.urlencoded({ extended: true }));

const sub_category_contrller = require('../controllers/subCategoryController');
const auth = require('../middlewre/auth')

sub_category_route.post('/add-sub-category',auth,sub_category_contrller.add_sub_category)

module.exports = sub_category_route;



