import { formatMoney } from "./formatMoney";

export const getTotalAmountSpent = (expenses) => {
  let total = 0;
  if (expenses) {
    expenses.forEach((expense) => {
      total += parseFloat(expense.price);
      return total.toFixed(2);
    });

    var totalFormat = formatMoney(total);
  }

  return totalFormat;
};
