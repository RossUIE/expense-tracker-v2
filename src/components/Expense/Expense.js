import React from "react";
import TrashIcon from "../svg/TrashIcon/TrashIcon";
import EditIcon from "../svg/EditIcon/EditIcon";
import "./expense.scss";

const Expense = (props) => {
  return (
    <>
      <div className="c-expense">
        <p className="expense title">{props.title}</p>
        <p className="dateSubmitted">{props.date}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{parseFloat(props.price).toFixed(2)}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{props.category}</p>
      </div>

      <div className="c-expense edit">
        <button className={"c-edit"}>
          <i className="material-icons expense-icons">edit</i>
        </button>
      </div>

      <div className="c-expense close">
        <button className={"c-close"}>
          <i className="material-icons expense-icons">delete_outline</i>
        </button>
      </div>
    </>
  );
};

export default Expense;
