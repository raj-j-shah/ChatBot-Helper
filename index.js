const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./controller/mongoose');
const user = require('./models/user');
app.use(bodyParser.json());

function calEmi(req) {
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
app.post('/get-response', async (req, res) => {

  console.log(req.body.queryResult);
  if ((req.body.queryResult).action === 'Two_wheeler.Two_wheeler-custom.Two_wheeler-custom-custom') {
    console.log("emi");
    res.json(calEmi(req));
  }
  else if ((req.body.queryResult).action === 'Four_wheeler.Four_wheeler-custom.Four_wheeler-custom-custom') {
    console.log("emi");
    res.json(calEmi(req));
  }
  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom') {
    console.log("namei");
    console.log("name aaya");
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
  else if ((req.body.queryResult).action === 'DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Customer-info-custom-custom') {
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
          fulfillmentText: `${mod_user_name} enter your email`,
        };
        res.json(response);
      }
      else{
        const gen_res = {
          "fulfillmentText": "Phone number is invalid"
        }
        res.json(gen_res);
      }
    }

  }
  else {
    const gen_res = {
      "fulfillmentText": "bye"
    }
    res.json(gen_res);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
