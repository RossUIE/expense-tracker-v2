import React from "react";
import "./expense.scss";
import ToolTip from "../ToolTip/tooltip";

const Expense = (props) => {
  return (
    <>
      <ToolTip />
      <div className="c-expense">
        {/* eslint-disable-next-line */}
        <a data-tip={props.title} data-for="main" className="expense title">
          {props.title}
        </a>
        <p className="dateSubmitted">{props.date}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{parseFloat(props.price).toFixed(2)}</p>
      </div>

      <div className="c-expense">
        <p className="expense">{props.category}</p>
      </div>

      <div className="c-expense edit">
        <button
          className={"c-edit"}
          onClick={() =>
            props.addModal(props.id, props.title, props.price, props.category)
          }
        >
          <i className="material-icons expense-icons">edit</i>
        </button>
      </div>

      <div className="c-expense close">
        <button
          className={"c-close"}
          onClick={() => props.deleteModal(props.id, props.title)}
        >
          <i className="material-icons expense-icons">delete_outline</i>
        </button>
      </div>
    </>
  );
};

export default Expense;
