import React, { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { getBudget } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./expenses-summary.scss";

const ExpensesSummary = ({ currentUser }) => {
  const [budget, setBudget] = useState();

  useEffect(() => {
    const getBudgets = async () => {
      await getBudget(currentUser.id).then((res) => {
        console.log(res);
        setBudget(res.budget);
      });
    };
    getBudgets();
  });

  return (
    <div className="expenses-summary">
      <p className="month">January</p>
      <div className="expenses-summary-graph">
        <ProgressBar />
      </div>
      {budget ? (
        <p className="spent">£24 of £{budget} spent</p>
      ) : (
        <p className="spent">Monthly budget not set</p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ExpensesSummary);
