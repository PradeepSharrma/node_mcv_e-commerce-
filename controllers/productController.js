const Product = require('../models/productModel');
const category_controller = require('./categoryController');
const store_controller = require('./storeController');

const add_product = async (req, res) => {
    try {
        var arrImages = [];
        for (let i = 0; i < req.files.length; i++) {
            arrImages[i] = req.files[i].filename;
        }

        var product = new Product({
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
            images: arrImages,

        });

        const product_data = await product.save();
        res.status(200).send({
            success: true,
            message: "Record has been saved successfully .",
            data: product_data
        });

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const get_products = async (req, res) => {
    try {
        const send_data = [];
        const cat_list = await category_controller.get_category();
        if (cat_list.length > 0) {
            for (let i = 0; i < cat_list.length; i++) {
                var product_data = [];
                var category_id = cat_list[i]['_id'].toString();
                var cat_product = await Product.find({ category_id: category_id });
                if (cat_product.length > 0) {
                    for (let j = 0; j < cat_product.length; j++) {
                        const storeData = await store_controller.get_store(cat_product[j]['store_id']);
                        product_data.push({
                            "product_name": cat_product[j]['name'],
                            "images": cat_product[j]['images'],
                            "store_address": storeData['address'],

                        });
                    }
                }
                send_data.push({
                    "category": cat_list[i]['category'],
                    "product": product_data,
                });
            }
            res.status(200).send({
                success: true,
                message: "Product details.",
                data: send_data
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Product details .",
                data: send_data
            });
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const search_product = async (req, res) => {
    try {

        var search = req.body.search;
        const prodctData = await Product.find({ "name":{ $regex: ".*"+search + ".*" }});
        if (prodctData.length > 0) {
            res.status(200).send({
                success: true,
                message: "Product details.",
                data: prodctData
            });
        } {
            res.status(200).send({
                success: true,
                message: "Product not found.",
                data: []
            });
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}


module.exports = {
    add_product,
    get_products,
    search_product
}