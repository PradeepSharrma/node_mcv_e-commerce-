const Category = require('../models/categoryModel');
const Cart = require('../models/cartModel');

const add_cart = async(req , res)=>{
    try {
        const car_obj = new Cart({
            product_id:req.body.product_id,
            price:req.body.price,
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id
        });

        const carData = await car_obj.save();

        res.status(200).send({
            success: true,
            message: "Record has been saved successfully.",
            data: carData
        });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

module.exports ={
    add_cart
}