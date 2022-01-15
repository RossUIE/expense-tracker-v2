import React, { useEffect, useState } from "react";
import Expense from "../Expense/Expense";
import { getExpenses } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getFormmatedDate } from "../../helpers/dateHelper";

import "./expense-list.scss";

const ExpenseList = ({ currentUser }) => {
  const [expenses, setExpenses] = useState();

  const getExpenseList = async () => {
    await getExpenses(currentUser.id).then((res) => {
      setExpenses(res);
    });
  };

  useEffect(() => {
    getExpenseList();
    console.log(currentUser.id);
  }, []);
  return (
    <div className="expense-list">
      <div className="expense-list_header">
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
      </div>
      <div className={"expense-list_content"}>
        {expenses?.map((expense) => {
          return (
            <Expense
              key={expense.id}
              title={expense.title}
              price={expense.price}
              category={expense.category}
              date={getFormmatedDate(
                expense.createdAt.seconds
              ).toLocaleDateString()}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ExpenseList);
