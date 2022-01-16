export const formatMoney = (price) => {
  return price.toLocaleString("en", {
    useGrouping: false,
    minimumFractionDigits: 2,
  });
};
