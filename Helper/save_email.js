//saves email of the user
const user = require('../models/user');
async function saveEmail(req,res){
    const eid = req.body.queryResult.parameters.email;
    const ssid = req.body.session;
    const curr_user = await user.find({ "session": ssid });
    if (curr_user.length > 0) {
      console.log("saving update....")
      const mod_userid = curr_user[0]._id;
      const mod_user_name = curr_user[0].user_name;
      await user.findByIdAndUpdate(mod_userid, { "email_id": eid });
      const response = {
        fulfillmentText: `${mod_user_name}, Do you want Loan?`,
      };
      res.json(response);
    }
    else {
      const gen_res = {
        "fulfillmentText": "email is invalid"
      }
      res.json(gen_res);
    }
}
module.exports = saveEmail;