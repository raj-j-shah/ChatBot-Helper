//web Hook server that accepts requests from dialoguflow and responds with fulfillment text.
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
  //if two wheeler emi calculation is requested
  if ((req.body.queryResult).action === 'Two_wheeler.Two_wheeler-yes.Two_wheeler-yes-custom'||req.body.queryResult.action==='Two_wheeler.Two_wheeler-custom.Two_wheeler-custom-custom') {
    calEmi(req,res);
  }
  //if four wheeler emi calculation is requested
  else if ((req.body.queryResult).action === 'Four_wheeler.Four_wheeler-yes.Four_wheeler-yes-custom'||req.body.queryResult.action==='Four_wheeler.Four_wheeler-custom.Four_wheeler-custom-custom') {
    calEmi(req,res);
  }
  //if user has entered his name
  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom') {
    saveName(req,res);
    
  }
  //if user has entered his phone no
  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Customer-info-custom-custom') {
    savePhone(req,res);
  
  }
  //if user has entered his email
  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Customer-info-custom-custom.Customer-info-custom-custom-custom') {
    saveEmail(req,res);
    
  }
   //if user has shown interest in two wheeler loan
  else if(req.body.queryResult.parameters.type_of_insurance === 'Two-wheeler'){
    addPrg(req,res);
  }
  //if user has shown interest in four wheeler loan
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
