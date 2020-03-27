import { getFormInputs, calculateTotal, handleClearForm } from './lib/handlers.js'
import { form, total, clearButton } from './lib/elements.js'

form.addEventListener("submit", getFormInputs);
total.addEventListener("calculateTotal", calculateTotal);
clearButton.addEventListener("click", handleClearForm);
