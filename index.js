const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const calEmi = require('./Helper/cal-emi');
const saveName = require('./Helper/save_name');
const savePhone = require('./Helper/save_phoneno');
const saveEmail = require('./Helper/save_email');
const addPrg = require('./Helper/addPrg')
const PORT = process.env.PORT || 3000;
require('./controller/mongoose');
app.use(bodyParser.json());

app.post('/get-response', async (req, res) => {

  console.log(req.body.queryResult);
  if ((req.body.queryResult).action === 'Two_wheeler.Two_wheeler-yes.Two_wheeler-yes-custom'||req.body.queryResult.action==='Two_wheeler.Two_wheeler-custom.Two_wheeler-custom-custom') {
    calEmi(req,res);
  }

  else if ((req.body.queryResult).action === 'Four_wheeler.Four_wheeler-yes.Four_wheeler-yes-custom'||req.body.queryResult.action==='Four_wheeler.Four_wheeler-custom.Four_wheeler-custom-custom') {
    calEmi(req,res);
  }

  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom') {
    saveName(req,res);
    
  }

  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Customer-info-custom-custom') {
    savePhone(req,res);
  
  }

  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Customer-info-custom-custom.Customer-info-custom-custom-custom') {
    saveEmail(req,res);
    
  }
  else if(req.body.queryResult.parameters.type_of_insurance === 'Two-wheeler'){
    addPrg(req,res);
  }
  else if(req.body.queryResult.parameters.type_of_insurance === 'Car'){
    addPrg(req,res)
  }

  else {
    const gen_res = {
      "fulfillmentText": "bye"
    }
    res.json(gen_res);
  }

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
