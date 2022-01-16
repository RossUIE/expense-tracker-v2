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

import "./add-expense-form.scss";

const AddExpenseForm = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

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
    try {
      await addExpense(title, price, category, currentUser).then((res) => {
        clearForm();
        return SuccessToast("Your expense has been added!");
      });
    } catch (error) {
      return ErrorToast("There has been an error uploading your expense.");
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
          required
        />

        <FormInput
          type="number"
          name="price"
          value={price}
          handleChange={handleChange}
          label={"Price"}
          required
        />
        <label htmlFor="category">Category:</label>
        <div className="select-dropdown">
          <select
            id="category"
            onChange={handleChange}
            name="category"
            value={category}
          >
            <option>Please Select</option>
            <option>Groceries</option>
            <option>Online Shopping</option>
            <option>Fuel</option>
            <option>Bills</option>
            <option>Eating Out</option>
            <option>Savings</option>
            <option>Retail</option>
            <option>Gifts</option>
            <option>Other</option>
          </select>
        </div>
        <CustomButton>Add expense</CustomButton>
        <CustomButton inverted onClick={() => clearForm()}>
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
