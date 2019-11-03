import { elements } from './base';

const entryHTML = (id, type, desc, amt) => {
  /**
   * Returns the HTML string that represents an transaction entry
   * @param {string} id - the id for the entry
   * @param {string} type - either income or expense
   * @param {string} desc - the description of the entry
   * @param {float} amt - the amount spent/gained
   */
  const typeLabel = type === '+' ? 'income' : 'expense';

  return `
    <div class="transactions-list__entry type-${typeLabel}" data-id=${id}>
      <div class="transactions-container__desc">
        <h3>${desc}</h3>
        <p class="entry__type">${typeLabel[0].toUpperCase() + typeLabel.slice(1)}</p>
      </div>
      <div class="transactions-list__amt">
        <h3>${type}$${amt}</h3>
        <button class="transactions-list__remove">
          <i class="fa fa-times"></i>
          <p class="remove__text">remove</p>
        </button>
      </div>
    </div>
  `
}

export const addEntry = (id, type, desc, amt) => {
  /**
     * The function that adds the entry to the transactions list
     * @param {int} id - the id of the entry
     * @param {string} type - either income or expense
     * @param {string} desc - the description of the entry
     * @param {float} amt - the amount spent/gained
     */
  const transactionsList = elements.transactionsList;
  transactionsList.insertAdjacentHTML('beforeend', entryHTML(id, type, desc, amt));
}

export const removeEntry = id => {
  /**
   * Removes an entry from the transaction list based on its ID
   * @param {int} id - the id of the entry to be removed
   */
  const entry = document.querySelector(`[data-id="${id}"]`);
  elements.transactionsList.removeChild(entry);
}

export const removeAllEntries = () => {
  /**
   * Removes all entries from the transactions list UI
   */
  const entries = document.querySelectorAll('.transactions-list__entry');
  for (let i = 0; i < entries.length; i++) {
    elements.transactionsList.removeChild(entries[i]);

  }
  elements.placeholder.classList.remove('hide');
  elements.placeholder.classList.add('show');
}

export const filterEntries = (type, filteredList) => {
  /**
   * Filters the entries based on the chosen type; i.e if 'income'
   * is chosen, then only the 'income' type entries will be shown
   * in the transactions list UI
   * @param {string} type - the type of entry chosen
   * @param {Array.<Transaction>} - list of transaction objects
   */
   
  var toDelete;
  var toShow;
  const filteredIDs = filteredList.map(obj => obj.id);

  if (type === 'income') {
    toDelete = document.querySelectorAll(`.type-expense`);
    toShow = document.querySelectorAll(`.type-income`);
  } else if (type === 'expense'){
    toDelete = document.querySelectorAll(`.type-income`);
    toShow = document.querySelectorAll(`.type-expense`);
  } else {
    toDelete = [];
  }

  // hide opposite type selected from entry list
  elements.placeholder.classList.add('hide');
  if (toDelete.length > 0) {
    for (let i = 0; i < toDelete.length; i++) {
      toDelete[i].classList.remove('show');
      toDelete[i].classList.toggle('hide');
    }
    if (toShow.length > 0) {
      for (let i = 0; i < toShow.length; i++) {
        toShow[i].classList.remove('hide');
        toShow[i].classList.add('show');
      }
    } else {
      elements.placeholder.classList.remove('hide');
    }
  }
  else {
    let entries = document.querySelectorAll('.transactions-list__entry')
    // show all elements
    for (let i = 0; i < entries.length; i++) {
      entries[i].classList.remove('hide');
      entries[i].classList.add('show');
    }
  }
}
