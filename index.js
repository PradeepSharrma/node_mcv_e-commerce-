const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeMvc');


const user_routes =  require('./routes/userRoutes');
const store_route = require('./routes/storeRoute');
const category_route = require('./routes/categoryRoute');
const sub_category_route = require('./routes/subCategoryRoute');
const product_route = require('./routes/productRoute');
const cart_route = require('./routes/cartRoute');
const address_route = require('./routes/addressRoute');
const address_robuy_product_routeute = require('./routes/buyProductRoute');

app.use('/api',user_routes);
app.use('/api',store_route);
app.use('/api',category_route);
app.use('/api',sub_category_route);
app.use('/api',product_route);
app.use('/api',cart_route);
app.use('/api',address_route);
app.use('/api',address_robuy_product_routeute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
// app.listen(8080,function(){
//     console.log(" server is ready to work");
// });

const port = process.env.API_PORT || 8080;
app.listen(port);
console.log('Server started at http://localhost:' + port);