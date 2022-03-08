import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getTotalAmountSpent } from "../../helpers/getTotalAmountSpent";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import monthNames from "../../constants/months";

import "./expenses-summary.scss";

const ExpensesSummary = ({ budget, expenses, month }) => {
  return (
    <div className="expenses-summary">
      <p className="month">{monthNames[month.month].name}</p>
      <div className="expenses-summary-graph">
        <ProgressBar
          budget={budget && budget.budget}
          value={expenses && getTotalAmountSpent(expenses)}
        />
      </div>
      {budget ? (
        <p className="spent">
          £{expenses && getTotalAmountSpent(expenses)} of £
          {budget && budget.budget} spent
        </p>
      ) : (
        <p className="spent">Monthly budget not set</p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  month: selectCurrentMonth,
});

export default connect(mapStateToProps)(ExpensesSummary);
