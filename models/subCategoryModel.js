const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category_id: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    

})


// const Store = mongoose.model('Store', storeSchema);
// module.exports = { Store };

//  Or
module.exports = mongoose.model('SubCategory', subCategorySchema);


