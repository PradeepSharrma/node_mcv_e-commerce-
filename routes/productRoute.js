const express = require("express");
const product_route = express();

const bodyParser = require('body-parser');
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const path = require('path');

product_route.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'), function (error, success) {
            if (error){
                throw error;
            } 
        });
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1){
                throw error1;
            } 
        });
    }
})

const upload = multer({ storage: storage });



const product_contrller = require('../controllers/productController');
const auth = require('../middlewre/auth');

product_route.post('/add-product',auth,upload.array('images'),product_contrller.add_product);
product_route.get('/get-products',auth,product_contrller.get_products);
product_route.get('/search-product',auth,product_contrller.search_product)

module.exports = product_route;



