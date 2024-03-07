const BuyProduct = require('../models/buyProductModel');
const Product = require('../models/productModel');

const buy_product = async (req, res) => {
    try {

        const buyProduct = new BuyProduct({
            product_id: req.body.product_id,
            transition_id: req.body.product_id,
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            customer_id: req.body.customer_id
        });

        const buyData = await buyProduct.save();

        res.status(200).send({
            success: true,
            message: "Record has been saved successfully.",
            data: buyData
        });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const get_product = async (req, res) => {
    // try {
    var page = req.body.page;
    var sort = req.body.sort;

    var product_data;
    var skip;
    if(page <=1 ){
        skip = 0;
    }else{
        skip = (page -1) * 2;

    }
    if(sort){
        var custom_sort ;
        if(sort == 'name'){
            custom_sort  ={
                name:1
            }
        }
        if(sort == '_id'){
            custom_sort  ={
                _id:1
            }
        }
         product_data = await Product.find().sort(custom_sort).skip(skip).limit(2);
        //  product_data = await Product.find().sort({name:-1}).skip(skip).limit(2);
    }else{
        product_data = await Product.find().skip(skip).limit(1);
        // product_data = await Product.find().skip(skip).limit(2);
    }

    //   product_data = await Product.find().skip(skip).limit(2);


    res.status(200).send({
        success: true,
        message: "Record has been saved successfully.",
        data: product_data
    });

    // } catch (error) {
    //     res.status(400).send({ success: false, error: error.message });
    // }
}

module.exports = {
    buy_product,
    get_product
}