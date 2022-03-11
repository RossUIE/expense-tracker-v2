import React, { useEffect, useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import Backdrop from "../backdrop/backdrop";
import ExpenseIllustration from "../svg/ExpenseIllustration/ExpenseIllustration";
import FormSelect from "../form-select/form-select";
import { expenseOptions } from "../../resources/expenseOptions";
import "./edit-expense-modal.scss";
import {
  ValidateTitle,
  ValidatePrice,
  ValidateCategory,
} from "../../helpers/validateForm";
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
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

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
    setTitleError(false);
    setPriceError(false);
    setCategoryError(false);
  };

  const handleEditSubmit = (e, editedTitle, editedPrice, editedCategory) => {
    e.preventDefault();
    if (!ValidateTitle(editedTitle)) {
      setTitleError(true);
      setTitleErrorMessage("Please input a title.");
    } else {
      setTitleError(false);
    }

    if (!ValidatePrice(editedPrice)) {
      setPriceError(true);
      setPriceErrorMessage("Please input a price.");
    } else {
      setPriceError(false);
    }

    if (!ValidateCategory(editedCategory)) {
      setCategoryError(true);
      setCategoryErrorMessage("Please select a category.");
    } else {
      setCategoryError(false);
    }

    if (
      ValidateTitle(editedTitle) &&
      ValidatePrice(editedPrice) &&
      ValidateCategory(editedCategory)
    ) {
      editUserExpense(e, editedTitle, editedPrice, editedCategory);
    }
  };

  useEffect(() => {
    setEditedTitle(title);
    setEditedPrice(price);
    setEditedCategory(category);
    setTitleError(false);
    setPriceError(false);
    setCategoryError(false);
  }, [active, category, price, title]);
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
          <div className="edit-modal-content_illustration">
            <ExpenseIllustration />
          </div>

          <form
            className="modal-form"
            onSubmit={(e) =>
              handleEditSubmit(e, editedTitle, editedPrice, editedCategory)
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
            />
            {titleError && (
              <div className="form-error-message">{titleErrorMessage}</div>
            )}

            <FormInput
              type="number"
              name="price"
              value={editedPrice ? editedPrice : ""}
              handleChange={handleChange}
              label={"Price"}
            />
            {priceError && (
              <div className="form-error-message">{priceErrorMessage}</div>
            )}

            <FormSelect
              name="category"
              onChange={handleChange}
              value={editedCategory ? editedCategory : ""}
              options={expenseOptions}
            />
            {categoryError && (
              <div className="form-error-message">{categoryErrorMessage}</div>
            )}
            <CustomButton>Confirm edit</CustomButton>
            <CustomButton type="button" inverted onClick={() => clearForm()}>
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
