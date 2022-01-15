export const getLocalDateString = () => {
  return new Date().toLocaleDateString("en-gb");
};

export const getFormmatedDate = (date) => {
  return new Date(date * 1000);
};
