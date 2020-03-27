import { total, totalCard, form } from './elements.js'
let results = [];

export function getFormInputs(event) {
  event.preventDefault();
  let bill = event.target.billAmount.value;
  const service = event.target.service.value;
  const pplAmount = event.target.numberOfPeople.value;

  if (bill.indexOf(',') > -1) bill = bill.replace(',', '');

  const billregex = /\d+\.?\d+/;
  const pplregex = /\d+/;

  if(!billregex.test(bill) || !pplregex.test(pplAmount)) {
    const invalidBill =  `Sorry '${bill}' is not a valid input`;
    const invalidPpl =  `Sorry '${pplAmount}' is not a valid input`;
    (!billregex.test(bill) ?
      alert(invalidBill) :
      alert(invalidPpl));
      form.reset();
  } else {
    results = {
      "bill": parseFloat(parseFloat(bill).toFixed(2)),
      "service": getTipPercentage(parseInt(service)),
      "pplAmount": parseInt(pplAmount),
    }
    total.dispatchEvent(new CustomEvent('calculateTotal'));
  }
}

function getTipPercentage(tip) {
  switch(tip) {
    case 1:
      return 0.15;
    case 2:
      return 0.18;
    case 3:
      return 0.20;
    case 4:
      return 0.25;
  }
}

export function calculateTotal() {
  let billTotal;
  if (results.pplAmount === 1) {
    billTotal = results.bill * results.service + results.bill
  } else {
    billTotal = ((results.bill * results.service) + results.bill) / results.pplAmount;
  }
  total.innerHTML = `<strong>$ ${results.pplAmount > 1 ? `${billTotal.toFixed(2)} per person` : billTotal.toFixed(2)}</strong>`;
  totalCard.hidden = false;
}

export function handleClearForm() {
  totalCard.hidden = true;
  form.reset();
  totalCard.classList.add('hidden');
}
