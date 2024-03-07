const Category = require('../models/categoryModel');


const add_category = async (req, res) => {
    try {
        const category = req.body.category;
        // const cateList = Category.findOne({category:req.body.category})
        const cateList = await Category.find();
        if (cateList.length > 0) {
            // console.log(cateList);
            let checking = false;
            for (let i = 0; i < cateList.length; i++) {
                if (cateList[i]['category'].toLowerCase() === category.toLowerCase()) {
                    checking = true;
                    break;
                }
            }
            if (checking == false) {
                const categoryReq = new Category({
                    category: category
                });
                const categoryData = await categoryReq.save();
                res.status(200).send({
                    success: true,
                    message: "Record has been saved successfully .",
                    data: categoryData
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: "This category (" + category + ") is all ready exists .",
                    // data: categoryData
                });
            }
        }
        else {
            const categoryReq = new Category({
                category: category
            });
            const categoryData = await categoryReq.save();
            res.status(200).send({
                success: true,
                message: "Record has been saved successfully .",
                data: categoryData
            });
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const get_category = async(req , res)=>{
    try {
        return Category.find();
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

module.exports = {
    add_category,
    get_category
}