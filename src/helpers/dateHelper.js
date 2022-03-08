const date = new Date();

export const getLocalDateString = () => {
  return new Date().toLocaleDateString("en-gb");
};

export const getFormmatedDate = (date) => {
  return new Date(date * 1000);
};

export const getFirstDayOfMonth = (month) => {
  return new Date(date.getFullYear(), month, 1).getTime() / 1000;
};

export const getLastDayOfMonth = (month) => {
  return new Date(date.getFullYear(), month + 1, 0).getTime() / 1000;
};
