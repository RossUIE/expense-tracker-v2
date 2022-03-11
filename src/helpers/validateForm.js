export const ValidateTitle = (title) => {
  if (title === "" || !title) {
    return false;
  } else {
    return true;
  }
};

export const ValidatePrice = (price) => {
  if (isNaN(price) || price === "" || !price) {
    return false;
  } else {
    return true;
  }
};

export const ValidateCategory = (category) => {
  if (category === "" || category === "Please Select" || !category) {
    return false;
  } else {
    return true;
  }
};

export const ValidateEmail = (email) => {
  //eslint-disable-next-line
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!email || email === "" || regex.test(email) === false) {
    return true;
  } else {
    return false;
  }
};

export const ValidatePasswords = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return false;
  } else {
    return true;
  }
};

export const emptyPassword = (password) => {
  if (password === "" || !password) {
    return true;
  } else {
    return false;
  }
};
