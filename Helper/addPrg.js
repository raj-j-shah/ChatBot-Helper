const user = require('../models/user');
async function addPrg(req,res){
    const ssid = req.body.session;
    const curr_user = await user.find({ "session": ssid });
    if (curr_user.length > 0) {
      console.log("saving update....")
      const mod_userid = curr_user[0]._id;
      if(req.body.queryResult.parameters.type_of_insurance === 'Two-wheeler')
      await user.findByIdAndUpdate(mod_userid, { "twlr": true });
        else if(req.body.queryResult.parameters.type_of_insurance === 'Car')
        await user.findByIdAndUpdate(mod_userid, { "frwlr": true });
      const response = {
        
      };
      res.json(response);
    }
}
module.exports = addPrg;