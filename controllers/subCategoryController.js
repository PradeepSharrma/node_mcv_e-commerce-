const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');


const add_sub_category = async (req, res) => {
    // try {
    const check_sub = await SubCategory.find({ category_id: req.body.category_id })
    if (check_sub.length > 0) {
        let checking = false;
        for (let i = 0; i < check_sub.length; i++) {
            if (check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()) {
                checking = true;
                break
            }
        }
        if (checking === false) {
            const subCategory = new SubCategory({
                category_id: req.body.category_id,
                sub_category: req.body.sub_category,
            });
            const sub_category = await subCategory.save();
            res.status(200).send({
                success: true,
                message: "Records has been saved successfully .",
                data: sub_category
            });
        } else {
            res.status(200).send({
                success: true,
                message: "This sub category (" + req.body.sub_category + ") is all ready exists ."
            });
        }
    } else {
        const subCategory = new SubCategory({
            category_id: req.body.category_id,
            sub_category: req.body.sub_category,
        });
        const sub_category = await subCategory.save();

        res.status(200).send({
            success: true,
            message: "Records has been saved successfully .",
            data: sub_category
        });
    }




    // } catch (error) {
    //     res.status(400).send({ success: false, error: error.message });
    // }
}

module.exports = {
    add_sub_category
}