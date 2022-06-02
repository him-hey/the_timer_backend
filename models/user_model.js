const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
})

userSchema.plugin(passportLocalMongoose);
const userModel = mongoose.model("user", userSchema);
module.exports.userModel = userModel;