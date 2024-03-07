const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        default:''
    }
    
})

//Compiling our schema into a Model.
// const User = mongoose.model('User', userSchema);

// module.exports = {User};

//  Or
module.exports = mongoose.model('User',userSchema);


