import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import Backdrop from "../backdrop/backdrop";
import { addExpense } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import {
  SuccessToast,
  ErrorToast,
} from "../../components/ToastMessages/ToastMessages";
import monthNames from "../../constants/months";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import ExpenseIllustration from "../svg/ExpenseIllustration/ExpenseIllustration";
import FormSelect from "../form-select/form-select";
import { expenseOptions } from "../../resources/expenseOptions";

import "./add-expense-modal.scss";

const AddExpenseModal = ({
  active,
  toggleAddModal,
  userExpenses,
  currentUser,
  month,
}) => {
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
    setPrice("");
    setTitle("");
    setCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addExpense(title, price, category, currentUser, month.month).then(
        (res) => {
          userExpenses(month.month);
          clearForm();
          toggleAddModal();
          return SuccessToast("Your expense has been added!");
        }
      );
    } catch (error) {
      return ErrorToast("There has been an error uploading your expense.");
    }
  };

  return (
    <>
      <button className="add-button" onClick={() => toggleAddModal()}>
        <i className="material-icons">add</i>
      </button>
      <div className={active ? "add-modal active" : "add-modal"}>
        <div className="add-modal-content">
          <div className="add-modal-content_header">
            <div className="add-modal_illustration">
              <ExpenseIllustration />
            </div>
            <div className="modal-close">
              <i
                className="material-icons close-icon"
                onClick={() => toggleAddModal()}
              >
                cancel
              </i>
            </div>
          </div>
          <h3>Add expense for {monthNames[month.month].name}</h3>
          <form
            className="modal-form"
            onSubmit={(e) => handleSubmit(e, title, price, category)}
          >
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
            <FormSelect
              name="category"
              onChange={handleChange}
              value={category}
              options={expenseOptions}
              required
            />
            <CustomButton>Add expense</CustomButton>
            <CustomButton inverted onClick={() => clearForm()}>
              Clear form
            </CustomButton>
          </form>
        </div>
      </div>
      {active && <Backdrop />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  month: selectCurrentMonth,
});

export default connect(mapStateToProps)(AddExpenseModal);
