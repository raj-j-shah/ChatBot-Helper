const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./controller/mongoose');
const user = require('./models/user');
app.use(bodyParser.json());

function calEmi(req){
  const loanAmount = JSON.parse(req.body.queryResult.fulfillmentText).loanamount;
  const interestRate = 10 / 100; // Convert percentage to decimal
  const tenure = JSON.parse(req.body.queryResult.fulfillmentText).tenure;
//   console.log(req.body);
//   console.log(loanAmount+" ,"+tenure);
// console.log("here")
// hi

  console.log(req);
  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = tenure * 12;

  var IRR = (10 / 100) / 12;
  var PresentValueInterstFector = Math.pow((1 + IRR), tenure);

  var PeriodicPayment = loanAmount * ((IRR * PresentValueInterstFector) / (PresentValueInterstFector - 1));
  var finalEmi = parseFloat(PeriodicPayment.toFixed(2));

  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const response = {
    fulfillmentText: `Your EMI is Rs.${finalEmi} per month.`,
  };
  return response
}
app.post('/get-response', (req,res) => {

  console.log(req.body.queryResult);
  if((req.body.queryResult).action==='Two_wheeler.Two_wheeler-custom.Two_wheeler-custom-custom'){
    console.log("emi");
    res.json(calEmi(req));
  }
  if((req.body.queryResult).action==='Four_wheeler.Four_wheeler-custom.Four_wheeler-custom-custom'){
    console.log("emi");
    res.json(calEmi(req));
  }
  if((req.body.queryResult).action==='DefaultWelcomeIntent.DefaultWelcomeIntent-custom'){
    console.log("namei");
      console.log("name aaya");
    const ssid = req.body.session;
    console.log(ssid);
    const name = req.body.queryResult.parameters.name.name;
    const new_user = new user({"user_name":name, "session":ssid});
    new_user.save();
    const response = {
      fulfillmentText: `Hi, ${name} please enter your phone number`,
    };
    res.json(response);

  } 



  res.json("asd");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
