const Address = require('../models/addressModel');

const add_address = async (req, res) => {
    // try {

    const existData = await Address.findOne({ user_id: req.body.user_id });

    if (existData) {
        var addAddress = [];
        for (let i = 0; i < existData.address.length; i++) {
            addAddress.push(existData.address[i])
        }
        addAddress.push(req.body.address);
        console.log(addAddress);
        const updatedData = await Address.findOneAndUpdate(
            { user_id: req.body.user_id },
            { $set: { address: addAddress } },
            { returnDocument: "after" }
        );

        res.status(200).send({
            success: true,
            message: "Record has been updated successfully.",
            data: updatedData
        });

    }
    else {
        const address = new Address({
            user_id: req.body.user_id,
            address: req.body.address
        });

        const addressSave = await address.save();

        res.status(200).send({
            success: true,
            message: "Record has been saved successfully.",
            data: addressSave
        });
    }



    // } catch (error) {
    //     res.status(400).send({ success: false, error: error.message });
    // }
}

module.exports = {
    add_address
}