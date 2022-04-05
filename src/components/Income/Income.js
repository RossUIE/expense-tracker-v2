import React from "react";
import "./income.scss";

const Income = (props) => {
  return (
    <>
      <div className="c-income">
        {/* eslint-disable-next-line */}
        <a data-tip={props.title} data-for="main" className="income title">
          {props.title}
        </a>
        <p className="dateSubmitted">{props.date}</p>
      </div>

      <div className="c-income">
        <p className="income">{parseFloat(props.price).toFixed(2)}</p>
      </div>

      <div className="c-income">
        <p className="income">{props.category}</p>
      </div>

      <div className="c-income edit">
        <button
          className={"c-edit"}
          onClick={() =>
            props.addModal(props.id, props.title, props.price, props.category)
          }
        >
          <i className="material-icons income-icons">edit</i>
        </button>
      </div>

      <div className="c-income close">
        <button
          className={"c-close"}
          onClick={() => props.deleteModal(props.id, props.title)}
        >
          <i className="material-icons income-icons">delete_outline</i>
        </button>
      </div>
    </>
  );
};

export default Income;
