const mongoose = require("mongoose");
import { isEmail } from 'validator';

const userSchema = mongoose.Schema({
    user_name:{
        type: String,
        required :true
    },
    phone_no:{
        type: Number,
        required :true
    },
    email_id:{
        type: string,
        validate: [ isEmail, 'invalid email'],
        required: true
    },
    income:{
        type: String,
        required: false,
        default: "0"
    }
})

const userModel = mongoose.model("user_details",userSchema);

module.exports = userModel;