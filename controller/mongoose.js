const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const pwd = process.env.PASSWORD;
const url = "mongodb+srv://tvs:"+pwd+"@cluster0.55e3p7d.mongodb.net/?retryWrites=true&w=majority";
async function fire(){
    mongoose.connect(url,{
        useNewUrlParser: true,
    })
    .then(()=>{
       
        console.log("connected")  
    })
    .catch((err)=>{
        console.log(err)
        console.log("not connected")
        
    });
}
fire();

module.exports = fire;










