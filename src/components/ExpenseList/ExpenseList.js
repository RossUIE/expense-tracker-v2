import React, { useState } from "react";
import Expense from "../Expense/Expense";
import { deleteExpense, editExpense } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getFormmatedDate } from "../../helpers/dateHelper";
import DeleteModal from "../DeleteModal/DeleteModal";
import { SuccessToast, ErrorToast } from "../ToastMessages/ToastMessages";
import NoDataIllustration from "../svg/NoDataIllustration/NoDataIllustration";
import { selectCurrentMonth } from "../../redux/month/month.selector";

import "./expense-list.scss";
import EditExpenseModal from "../EditExpenseModal/EditExpenseModal";

const ExpenseList = ({ currentUser, expenses, getUserExpenses, month }) => {
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const [addSuccessful, setAddSuccessful] = useState(false);

  const toggleDeleteModal = (id, title) => {
    setDeleteSuccessful((previousValue) => !previousValue);
    setExpenseId(id);
    setExpenseTitle(title);
  };

  const toggleAddModal = (id, title, price, category) => {
    setAddSuccessful((previousValue) => !previousValue);
    setExpenseId(id);
    setExpenseTitle(title);
    setExpensePrice(price);
    setExpenseCategory(category);
  };

  const editUserExpense = async (
    e,
    editedTitle,
    editedPrice,
    editedCategory
  ) => {
    e.preventDefault();
    try {
      await editExpense(
        currentUser.id,
        editedTitle,
        editedPrice,
        editedCategory,
        expenseId
      )
        .then((res) => {
          setAddSuccessful(true);
          getUserExpenses(month.month);
          toggleAddModal();
          return SuccessToast("Your expense has been edited.");
        })
        .catch(console.error);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserExpense = async () => {
    try {
      await deleteExpense(currentUser.id, expenseId)
        .then((res) => {
          setDeleteSuccessful(true);
          getUserExpenses(month.month);
          toggleDeleteModal();
          return SuccessToast("Your expense has been deleted.");
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
      ErrorToast(
        "There was a problem deleting your expense. Please try again later."
      );
    }
  };
  return (
    <>
      <div className="expense-list">
        <div className="expense-list_header">
          <p>Title</p>
          <p>Price</p>
          <p>Category</p>
        </div>
        <div
          className={
            expenses?.length !== 0
              ? "expense-list_content"
              : "no-expense_content"
          }
        >
          {expenses?.length !== 0 ? (
            expenses?.map((expense) => {
              return (
                <Expense
                  key={expense.id}
                  id={expense.id}
                  title={expense.title}
                  price={expense.price}
                  category={expense.category}
                  date={getFormmatedDate(
                    expense.createdAt.seconds
                  ).toLocaleDateString()}
                  deleteModal={toggleDeleteModal}
                  addModal={toggleAddModal}
                />
              );
            })
          ) : (
            <div className="no-expenses">
              <div className="no-expenses-illustration">
                <NoDataIllustration />
              </div>
              <p>No expenses for this month</p>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        title={expenseTitle}
        active={deleteSuccessful}
        deleteHandler={deleteUserExpense}
        toggleDeleteModal={toggleDeleteModal}
      />

      <EditExpenseModal
        title={expenseTitle}
        price={expensePrice}
        category={expenseCategory}
        active={addSuccessful}
        toggleAddModal={toggleAddModal}
        editUserExpense={editUserExpense}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  month: selectCurrentMonth,
});

export default connect(mapStateToProps)(ExpenseList);
