const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/calculate-emi', (req, res) => {
  const loanAmount = req.body.queryResult.parameters['loan-amount'];
  const interestRate = req.body.queryResult.parameters['interest-rate'] / 100; // Convert percentage to decimal
  const tenure = req.body.queryResult.parameters['tenure'];

  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = tenure * 12;

  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const response = {
    fulfillmentText: `Your EMI is $${emi.toFixed(2)} per month.`,
  };

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
