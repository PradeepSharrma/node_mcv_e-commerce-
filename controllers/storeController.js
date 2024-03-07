const User = require('../models/userModel');
const Store = require('../models/storeModel');

const create_store = async (req, res) => {
    try {

    const vendorId = req.body.vendor_id;
    const userData = await User.findById(vendorId);

    if (userData) {

        if (!req.body.latitude || !req.body.logitude) {
            res.status(200).send({
                success: false,
                message: "Latitude and longitude not found "
            });
        } else {
            const vendorData = await Store.findOne({ vendor_id: vendorId });            
            if (vendorData) {
                res.status(200).send({
                    success: false,
                    message: "Vendor id all ready exists ."
                });
            } else {
                const store = new Store({
                    vendor_id: req.body.vendor_id,
                    logo: req.file.filename,
                    bussines_email: req.body.bussines_email,
                    address: req.body.address,
                    pin: req.body.pin,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.logitude)]
                    }
                });

                const storeData = await store.save();

                res.status(200).send({
                    success: true,
                    message: "Record has been saved successfully .",
                    data: storeData
                });
            }
        }

    } else {
        res.status(200).send({
            success: false,
            message: "Vendor id does not match "
        });
    }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const get_store = async(id)=>{
    try {
        return Store.findOne({_id:id});
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

module.exports = {
    create_store,
    get_store
}
