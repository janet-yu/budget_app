// NEED:
// 1. Whenever 'add' button is clicked, update transactions list
//    - must check if all inputs have a value
//    - must check if all inputs are valid
// change type selection function

import { elements } from './base';

elements.type.classList.add('inc-selected');
// need to add classes for each types selected state

export const changeType = (e) => {
  /**
   * Depending on which type is selected, update the UI with corresponding active state class
   * Example: '+' is selected, add 'type-selected' class and 'inc-selected' to style it correctly
   * @param {Element} e - either the income button or expense button
   */

  elements.type = e.target;
  if (e.target.innerHTML === "+") {
    e.target.classList.add('inc-selected', 'type-selected');
    elements.expBtn.classList.remove('exp-selected');
    elements.expBtn.classList.remove('type-selected');
  }
  else {
    e.target.classList.add('exp-selected', 'type-selected');
    elements.incBtn.classList.remove('inc-selected');
    elements.incBtn.classList.remove('type-selected');
  }
}

export const clearInputs = () => {
  /**
   * Clears all inputs
   */
  elements.description.value = '';
  elements.amount.value = '';
}
