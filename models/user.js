const mongoose = require("mongoose");
import { isEmail } from 'validator';

const userSchema = mongoose.Schema({
    session:{
        type: String,
        required:false
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
        type: string,
        validate: [ isEmail, 'invalid email'],
        required: false
    },
    income:{
        type: String,
        required: false,
        default: "0"
    }
})

const userModel = mongoose.model("user_details",userSchema);

module.exports = userModel;