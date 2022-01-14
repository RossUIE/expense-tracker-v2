import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { addExpense } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./add-expense-form.scss";
import SuccessfulUpload from "../SuccessfulUpload/successfulUpload";

const AddExpenseForm = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [successfulUpload, setSuccessfulUpload] = useState(false);

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
    await addExpense(title, price, category, currentUser).then((res) => {
      clearForm();
      setSuccessfulUpload(true);
      setTimeout(() => {
        setSuccessfulUpload(false);
      }, 3000);
    });
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
      {successfulUpload && <SuccessfulUpload />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AddExpenseForm);
