import React, { useState } from "react";
import SetBudgetIllustration from "../../components/svg/SetBudgetIllustration/SetBudgetIllustration";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from "../../components/svg/BackButton/back-button";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { addBudget } from "../../firebase/firebase.utils";

import "./set-budget.scss";

export const SetBudget = ({ currentUser }) => {
  const [budget, setBudget] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "budget") {
      setBudget(value);
    }
  };

  const handleBudget = (e) => {
    e.preventDefault();
    addBudget(budget, currentUser);
    console.log("yeeoo");
  };

  return (
    <div className="set-budget">
      <NavLink to="/">
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="set-budget-illustration">
        <SetBudgetIllustration />
      </div>
      <div className="set-budget-title">
        <h1>Set your monthly budget</h1>
        <p>Set how much you want to spend each month</p>
      </div>
      <form className="set-budget-content">
        <FormInput
          type="number"
          name="budget"
          value={budget}
          handleChange={handleChange}
          label={"Your monthly budget"}
          required
        />
        <CustomButton onClick={(e) => handleBudget(e)}>Confirm</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SetBudget);
