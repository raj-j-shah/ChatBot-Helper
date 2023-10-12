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
      fulfillmentText: `Your EMI is Rs.${finalEmi} per month. \nThese results are for indicative purposes only. Actual results may vary. For exact details, please contact us at helpdesk@tvscredit.com.`,
    };
    return response
  }
  module.exports = calEmi;