import React, { useState } from "react";
import Income from "../Income/Income";
import "./income-list.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
import {
  deleteIncome,
  editExpense,
  editIncome,
} from "../../firebase/firebase.utils";
import NoDataIllustration from "../svg/NoDataIllustration/NoDataIllustration";
import { getFormmatedDate } from "../../helpers/dateHelper";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import { SuccessToast, ErrorToast } from "../ToastMessages/ToastMessages";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import EditExpenseModal from "../EditExpenseModal/EditExpenseModal";

const AdditionalIncomeList = ({
  currentUser,
  incomes,
  month,
  getUserIncomes,
}) => {
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [incomeId, setIncomeId] = useState(null);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomePrice, setIncomePrice] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [addSuccessful, setAddSuccessful] = useState(false);

  const toggleDeleteModal = (id, title) => {
    setDeleteSuccessful((previousValue) => !previousValue);
    setIncomeId(id);
    setIncomeTitle(title);
  };

  const toggleAddModal = (id, title, price, category) => {
    setAddSuccessful((previousValue) => !previousValue);
    setIncomeId(id);
    setIncomeTitle(title);
    setIncomePrice(price);
    setIncomeCategory(category);
  };

  const editUserIncome = async (
    e,
    editedTitle,
    editedPrice,
    editedCategory
  ) => {
    e.preventDefault();
    try {
      await editIncome(
        currentUser.id,
        editedTitle,
        editedPrice,
        editedCategory,
        incomeId
      )
        .then((res) => {
          setAddSuccessful(true);
          getUserIncomes(month.month);
          toggleAddModal();
          return SuccessToast("Your income has been edited.");
        })
        .catch(console.error);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserIncome = async () => {
    try {
      await deleteIncome(currentUser.id, incomeId)
        .then((res) => {
          setDeleteSuccessful(true);
          getUserIncomes(month.month);
          toggleDeleteModal();
          return SuccessToast("Your income has been deleted.");
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
      ErrorToast(
        "There was a problem deleting your income. Please try again later."
      );
    }
  };
  return (
    <div className="additionalIncome-list">
      <div className="additionalIncome-list_header">
        <p>Title</p>
        <p>Amount</p>
        <p>Category</p>
      </div>
      <div
        className={
          incomes?.length !== 0
            ? "additionalIncome-list_content"
            : "no-incomes_content"
        }
      >
        {incomes?.length !== 0 ? (
          incomes?.map((income, key) => {
            return (
              <Income
                id={income.id}
                key={key}
                title={income.title}
                price={income.price}
                category={income.category}
                date={getFormmatedDate(
                  income.createdAt.seconds
                ).toLocaleDateString()}
                deleteModal={toggleDeleteModal}
                addModal={toggleAddModal}
              />
            );
          })
        ) : (
          <div className="no-incomes">
            <div className="no-incomes-illustration">
              <NoDataIllustration />
            </div>
            <p>No incomes for this month</p>
          </div>
        )}
      </div>
      <DeleteModal
        title={incomeTitle}
        active={deleteSuccessful}
        deleteHandler={deleteUserIncome}
        toggleDeleteModal={toggleDeleteModal}
      />
      <EditExpenseModal
        title={incomeTitle}
        price={incomePrice}
        category={incomeCategory}
        active={addSuccessful}
        toggleAddModal={toggleAddModal}
        editUserExpense={editUserIncome}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  month: selectCurrentMonth,
});

export default connect(mapStateToProps)(AdditionalIncomeList);
