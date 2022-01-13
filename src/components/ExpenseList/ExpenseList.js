import React from "react";
import Expense from "../Expense/Expense";

import "./expense-list.scss";

const ExpenseList = () => {
  return (
    <div className="expense-list">
      <div className="expense-list_header">
        <p>TITLE</p>
        <p>PRICE</p>
        <p>CATEGORY</p>
      </div>
      <div className={"expense-list_content"}>
        <Expense
          key={"1"}
          identifier={1}
          title={"Test"}
          price={12.0}
          category={"Test Cat"}
          date={"12/12/12"}
          dateSubmitted={"12/12/12"}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
