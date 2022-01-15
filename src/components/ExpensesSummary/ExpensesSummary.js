import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./expenses-summary.scss";

const ExpensesSummary = () => {
  return (
    <div className="expenses-summary">
      <p className="month">January</p>
      <div className="expenses-summary-graph">
        <ProgressBar />
      </div>
      <p className="spent">£24 of £1000</p>
    </div>
  );
};

export default ExpensesSummary;
