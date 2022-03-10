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
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!email || email === "" || regex.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
