// form
const form = document.getElementById('loan-form');
// adding a submit event
form.addEventListener('submit', calculateInterest);

function calculateInterest(e) {

  console.log('Calculating...');

  // input fields
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  // display fields
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest)/(x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
  } else {
    console.log('Check your numbers');
    showErrors('Check your numbers');
  }

  e.preventDefault();  
}

function showErrors(error) {
  // create a div
  const errorDiv = document.createElement('div');
  // add class to it
  errorDiv.className = 'alert alert-danger';
  // create text node and append to errorDiv
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // insert error above heading
  card.insertBefore(errorDiv, heading);
  // remove the alert after 3000
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}