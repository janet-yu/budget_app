import { elements } from './base';

export const updateFinancesView = (balance, inc, exp) => {
  /**
   * Updates the balance, income, and expenses view
   * @param {float} balance - float representing current balance
   * @param {float} inc - float representing current income
   * @param {float} exp - float representing current expenses
   */

  elements.incomeText.innerHTML = `$${inc}`;
  elements.expenseText.innerHTML = `$${exp}`;

  if (balance < 0) {
      const amtString = balance % 1 !== 0 ? Math.abs(balance).toFixed(2) : Math.abs(balance);
      elements.balanceText.innerHTML =`-$${amtString}`;
  } else {
    elements.balanceText.innerHTML =`$${balance}`;
  }
}
