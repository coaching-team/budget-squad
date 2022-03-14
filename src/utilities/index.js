// Format a date in this format: M-D-YYYY
export const formatDate = (date) => `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;

// Format an amount in this format: -$MMM,MMM.MM
export const formatMoney = (amount) => {
  let formattedAmount = Number(Math.abs(amount));
  formattedAmount = formattedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (amount < 0) ? `-$${formattedAmount}` : `$${formattedAmount}`;
};
