// Connects models and views

import { elements } from './views/base';
import Transactions from './models/Transactions';
import * as inputView from './views/inputView';
import * as financesView from './views/financesView';
import * as transactionsView from './views/transactionsView';

let state = {
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: new Transactions(),
  currID: 0,
  month: (new Date()).getMonth(),
  year: (new Date()).getFullYear()
};

const months = ['January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'];

elements.month.innerHTML = `${months[state.month]} ${state.year}`;

var windowWidth;

const controlInputModal = () => {
  /**
   * Controls whether or not the mobile input transaction modal appears
   * or not based on window size.
  */
  windowWidth = window.innerWidth
                      || document.documentElement.clientWidth
                      || document.body.clientWidth;

  if (windowWidth < 825) {
    elements.transactionsContainer.classList.add('hide');
    elements.overlay.classList.add('hide');
  } else {
    elements.transactionsContainer.classList.remove('hide');
  }
}

const controlPlaceholderView = (visibility) => {
  /**
   * Controls the visibility of the placeholder graphic when no entries are
   * available.
   * @param {boolean} visibility - boolean value that determines if placeholder
   * should be visible or not
   */
  if (visibility) {
    elements.placeholder.classList.remove('hide');
  }
  else {
    elements.placeholder.classList.add('hide');
  }
}

const fixDecimals = (amt) => {
  /**
   * Fix the amount to two decimal places if it is a float, and to 0 if it isn't
   * @param {float} amt - the type of entry chosen
   */
  return (amt % 1 !== 0 && amt % 1 > 0.001 ? amt.toFixed(2) : amt.toFixed(0));
}

// Control balance, income, and expenses view/model when adding entry
const controlFinances = (type, amt) => {
  /**
   * The finances view is updated according to the amount/type
   * @param {string} type - the type of entry chosen
   * @param {float} amt - income/expense value
   */
  const amtFloat = parseFloat(amt);

  if (type === '+') {
    state.income += amtFloat;
    state.balance += amtFloat;
  }
  else {
    state.expenses += amtFloat;
    state.balance -= amtFloat;
  }

  financesView.updateFinancesView(fixDecimals(state.balance), fixDecimals(state.income), fixDecimals(state.expenses));
}

const ctrlFinancesRemoval = (type, amt) => {
  /**
   * Updates finances view when entries are removed
   * @param {string} type - the type of entry chosen
   * @param {float} amt - income/expense value
   */
  const floatAmt = parseFloat(amt); // parseFloat bc amt is a string

  if (type === '+') {
    state.income -= floatAmt;
    state.balance -= floatAmt;
  }
  else {
    state.expenses -= floatAmt;
    state.balance += floatAmt;
  }
  financesView.updateFinancesView(fixDecimals(state.balance), fixDecimals(state.income), fixDecimals(state.expenses));
}

const controlTransactions = (type, desc, amt) => {
  /**
   * Updates transactions list view with entry of type, description desc, and amount amt
   * @param {string} type - the type of entry chosen
   * @param {string} desc - description of the transaction entry
   * @param {float} amt - income/expense value
   */

  if (!desc) {
    elements.description.classList.add('error');
  }
  if (!amt || amt === '0' || amt < 0) {
    elements.amount.classList.add('error');
  }
  else {
    elements.description.classList.remove('error');
    elements.amount.classList.remove('error');

    if (state.currID === 0) {
      state.currID = 1;
    }
    else {
      state.currID++;
    }

    const transaction = state.transactions.addTransaction(state.currID, type, desc, amt);
    controlPlaceholderView(false);
    transactionsView.addEntry(state.currID, type, desc, amt);
    inputView.clearInputs();

    controlFinances(type, amt);
  }
}

const resetFinances = () => {
  /**
   * Resets all finances back to 0
   */
  state.balance = 0;
  state.income = 0;
  state.expenses = 0;

  financesView.updateFinancesView(state.balance, state.income, state.expenses);
}

const controlRemoveEntry = (e) => {
  /**
    * Controls the finances and transactions list views when
    * an transaction entry is removed.
    */
  const transactionsList = e.target.closest('.transactions-container__transactions-list');
  if (transactionsList) {
    // const entryEl = e.target.parentElement.parentElement.parentElement;
    const entryEl = e.target.closest('.transactions-list__entry');
    const entryID = entryEl.getAttribute('data-id');
    const amtElement =  entryEl.querySelector('.transactions-list__amt h3');

    const entryAmt = amtElement.innerHTML.substring(2);
    const entryType = amtElement.innerHTML.slice(0,1);

    transactionsView.removeEntry(entryEl.getAttribute('data-id'));

    state.transactions.removeTransaction(entryID);

    if (state.transactions.getTransactionsLength() === 0) {
      state.currID = 0;
      controlPlaceholderView(true);
    }

    // Adjust balance to reflect removal
    ctrlFinancesRemoval(entryType, entryAmt);
  }
}

const controlFilter = (e) => {
  /**
    * Updates transactions list view with selected types of entries;
    * Also updates current state's transactions list
    */

  state.transactions.filterTransactions(e.target.value);
  const filteredTransactions = state.transactions.getFilteredTransactions();
  transactionsView.filterEntries(e.target.value, filteredTransactions);
}

const setupEventListeners = () => {
  /**
    * Sets up all event listeners
  */
  window.addEventListener('resize', controlInputModal);
  window.addEventListener('load', controlInputModal);

  elements.addBtn.addEventListener('click', function() {
    const type = elements.type.innerHTML;
    const desc = elements.description.value;
    const amt = elements.amount.value;
    controlTransactions(type, desc, amt);
  });

  document.addEventListener('keypress', function(event) {
    const type = elements.type.innerHTML;
    const desc = elements.description.value;
    const amt = elements.amount.value;
      if (event.keyCode === 13 || event.which === 13) {
        controlTransactions(type, desc, amt);
      }
  });

  // event bubbling
  elements.transactionsList.addEventListener('click', function(e) {
    controlRemoveEntry(e);
  });

  elements.filter.addEventListener('change', function(e) {
    controlFilter(e);
  });

  elements.modalExitBtn.addEventListener('click', function(e) {
    elements.transactionsContainer.classList.add('hide');
    elements.overlay.classList.add('hide');
  });

  elements.mobileAddTransaction.addEventListener('click', function() {
    elements.transactionsContainer.classList.remove('hide');
    elements.overlay.classList.remove('hide');
  });

  for (let i = 0; i < elements.typeBtns.length; i++) {
    elements.typeBtns[i].addEventListener("click", inputView.changeType);
  }

  elements.clearEntriesBtn.addEventListener('click', function() {
    transactionsView.removeAllEntries();
    resetFinances();
  });

}

setupEventListeners();
