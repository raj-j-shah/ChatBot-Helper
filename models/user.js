const mongoose = require("mongoose");
const {isEmail} = require("validator");

const user = mongoose.model('user',{
    session:{
        type: String,
        required:true
    },
    user_name:{
        type: String,
        required :true
    },
    phone_no:{
        type: Number,
        required :false
    },
    email_id:{
        type: String,
        validate: [ isEmail, 'invalid email'],
        required: false
    },
    income:{
        type: String,
        required: false,
        default: "0"
    }
});

module.exports = user;
