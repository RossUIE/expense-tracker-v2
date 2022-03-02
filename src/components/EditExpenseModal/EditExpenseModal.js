import React, { useEffect, useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import Backdrop from "../backdrop/backdrop";

import "./edit-expense-modal.scss";
const EditExpenseModal = ({
  title,
  price,
  category,
  toggleAddModal,
  active,
  editUserExpense,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "title") {
      setEditedTitle(value);
    }

    if (name === "price") {
      setEditedPrice(value);
    }

    if (name === "category") {
      setEditedCategory(value);
    }
  };

  const clearForm = () => {
    setEditedTitle("");
    setEditedPrice("");
    setEditedCategory("");
  };

  useEffect(() => {
    setEditedTitle(title);
    setEditedPrice(price);
    setEditedCategory(category);
  }, [active]);
  return (
    <>
      <div className={active ? "edit-modal active" : "edit-modal"}>
        <div className="edit-modal-content">
          <div className="edit-modal-content_header">
            <div className="modal-close">
              <i
                className="material-icons close-icon"
                onClick={() => toggleAddModal()}
              >
                cancel
              </i>
            </div>
          </div>

          <form
            className="modal-form"
            onSubmit={(e) =>
              editUserExpense(e, editedTitle, editedPrice, editedCategory)
            }
          >
            <h3>Edit expense '{title}'</h3>
            <FormInput
              title="true"
              type="text"
              name="title"
              value={editedTitle ? editedTitle : ""}
              handleChange={handleChange}
              label={"Title"}
              required
            />

            <FormInput
              type="number"
              name="price"
              value={editedPrice ? editedPrice : ""}
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
                value={editedCategory ? editedCategory : ""}
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
            <CustomButton>Confirm edit</CustomButton>
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

export default EditExpenseModal;
