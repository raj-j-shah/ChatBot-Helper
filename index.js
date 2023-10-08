const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/calculate-emi', (req, res) => {
  const loanAmount = JSON.parse(req.body.queryResult.fulfillmentText).loanamount;
  const interestRate = 10 / 100; // Convert percentage to decimal
  const tenure = JSON.parse(req.body.queryResult.fulfillmentText).tenure;
//   console.log(req.body);
//   console.log(loanAmount+" ,"+tenure);
// console.log("here")
  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = tenure * 12;

  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const response = {
    fulfillmentText: `Your EMI is Rs.${emi.toFixed(2)} per month.`,
  };

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
