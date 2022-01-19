import React, { useState } from "react";
import Expense from "../Expense/Expense";
import { deleteExpense } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getFormmatedDate } from "../../helpers/dateHelper";
import DeleteModal from "../DeleteModal/DeleteModal";
import { SuccessToast, ErrorToast } from "../ToastMessages/ToastMessages";
import NoDataIllustration from "../svg/NoDataIllustration/NoDataIllustration";

import "./expense-list.scss";

const ExpenseList = ({ currentUser, expenses, getUserExpenses }) => {
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [expenseDeleteTitle, setExpenseDeleteTitle] = useState("");

  const toggleDeleteModal = (id, title) => {
    setDeleteSuccessful((previousValue) => !previousValue);
    setExpenseId(id);
    setExpenseDeleteTitle(title);
  };

  const deleteUserExpense = async () => {
    try {
      await deleteExpense(currentUser.id, expenseId)
        .then((res) => {
          setDeleteSuccessful(true);
          getUserExpenses();
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
        title={expenseDeleteTitle}
        active={deleteSuccessful}
        deleteUserExpense={deleteUserExpense}
        toggleDeleteModal={toggleDeleteModal}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ExpenseList);
