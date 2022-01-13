import React from "react";
import TrashIcon from "../svg/TrashIcon/TrashIcon";
import EditIcon from "../svg/EditIcon/EditIcon";
import "./expense.scss";

const Expense = (props) => {
  return (
    <>
      <div className="c-expense">
        <p className="expense title">{props.title}</p>
        <p className="dateSubmitted">Added: {props.dateSubmitted}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{parseFloat(props.price).toFixed(2)}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{props.category}</p>
      </div>

      <div className="c-expense edit">
        <button className={"c-edit"}>
          <EditIcon />
        </button>
      </div>

      <div className="c-expense close">
        <button className={"c-close"}>
          <TrashIcon />
        </button>
      </div>
    </>
  );
};

export default Expense;
