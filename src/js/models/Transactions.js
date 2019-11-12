// Keeps track of transactions

export default class Transactions {
  // Each transaction will be an object
  constructor() {
    this.transactions = [];
    this.filteredTransactions = [];
  }

  addTransaction(id, type, desc, amt) {
    const typeLabel = type === '+' ? 'income' : 'expense';
    const transaction = { id, type: typeLabel, desc, amt };
    this.transactions.push(transaction);

    return transaction;
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter(obj => obj.id != id);
  }

  filterTransactions(type) {
    this.filteredTransactions = this.transactions.filter(entry => entry.type === type);
  }

  getTransactionsLength() {
    return this.transactions.length;
  }

  getFilteredTransactions() {
    return this.filteredTransactions;
  }

}
