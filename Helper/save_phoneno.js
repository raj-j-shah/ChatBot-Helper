const user = require('../models/user');
async function savePhone(req,res){
    const pno = req.body.queryResult.parameters['phone-number'];
    var phoneNumberPattern = /^\d{10}$/;
    console.log("pno");
    // Remove any non-digit characters from the input string
    var cleanInput = pno.replace(/\D/g, '');

    // Test if the cleaned input matches the pattern
    if (phoneNumberPattern.test(cleanInput)) {
      const ssid = req.body.session;
      const curr_user = await user.find({ "session": ssid });
      if (curr_user.length > 0) {
        console.log("saving update....")
        const mod_userid = curr_user[0]._id;
        const mod_user_name = curr_user[0].user_name;
        await user.findByIdAndUpdate(mod_userid, { "phone_no": cleanInput });
        const response = {
          fulfillmentText: `${mod_user_name} ,Please enter your Email`,
        };
        res.json(response);
      }
      else {
        const gen_res = {
          "fulfillmentText": "Phone number is invalid"
        }
        res.json(response);
      }
    }
    else {

      const gen_res = {
        "fulfillmentText": "Phone number is invalid"
      }
      res.json(gen_res);

    }
}
module.exports = savePhone;