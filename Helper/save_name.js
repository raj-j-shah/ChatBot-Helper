//saves the name of the customer
const user = require('../models/user');
async function savename(req,res){
    const ssid = req.body.session;
    console.log(ssid);
    const name = req.body.queryResult.parameters.name.name;
    const new_user = new user({ "user_name": name, "session": ssid });
    new_user.save();
    const response = {
      fulfillmentText: `Hi, ${name} please enter your phone number`,
    };
    res.json(response);
}
module.exports = savename;