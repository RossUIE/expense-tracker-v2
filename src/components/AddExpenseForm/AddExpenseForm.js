import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { addExpense } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import {
  SuccessToast,
  ErrorToast,
} from "../../components/ToastMessages/ToastMessages";
import {
  ValidateTitle,
  ValidatePrice,
  ValidateCategory,
} from "../../helpers/validateForm";

import "./add-expense-form.scss";
import FormSelect from "../form-select/form-select";
import { expenseOptions } from "../../resources/expenseOptions";

const AddExpenseForm = ({ currentUser, userExpenses }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "price") {
      setPrice(value);
    }

    if (name === "category") {
      setCategory(value);
    }
  };

  const clearForm = () => {
    setTitle("");
    setPrice("");
    setCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ValidateTitle(title)) {
      setTitleError(true);
      setTitleErrorMessage("Please input a title.");
    } else {
      setTitleError(false);
    }

    if (!ValidatePrice(price)) {
      setPriceError(true);
      setPriceErrorMessage("Please input a price.");
    } else {
      setPriceError(false);
    }

    if (!ValidateCategory(category)) {
      setCategoryError(true);
      setCategoryErrorMessage("Please select a category.");
    } else {
      setCategoryError(false);
    }

    if (
      ValidateTitle(title) &&
      ValidatePrice(price) &&
      ValidateCategory(category)
    ) {
      try {
        await addExpense(title, price, category, currentUser, "").then(
          (res) => {
            userExpenses();
            clearForm();
            return SuccessToast("Your expense has been added!");
          }
        );
      } catch (error) {
        return ErrorToast("There has been an error uploading your expense.");
      }
    }
  };

  return (
    <div className="add-expense-form">
      <h3>Add an expense for this month</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          title="true"
          type="text"
          name="title"
          value={title}
          handleChange={handleChange}
          label={"Title"}
        />
        {titleError && (
          <div className="form-error-message">{titleErrorMessage}</div>
        )}

        <FormInput
          type="number"
          name="price"
          value={price}
          handleChange={handleChange}
          label={"Price"}
        />
        {priceError && (
          <div className="form-error-message">{priceErrorMessage}</div>
        )}
        <FormSelect
          name="category"
          onChange={handleChange}
          value={category}
          options={expenseOptions}
          required
        />
        {categoryError && (
          <div className="form-error-message">{categoryErrorMessage}</div>
        )}
        <CustomButton>Add expense</CustomButton>
        <CustomButton type="button" inverted onClick={() => clearForm()}>
          Clear form
        </CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AddExpenseForm);
