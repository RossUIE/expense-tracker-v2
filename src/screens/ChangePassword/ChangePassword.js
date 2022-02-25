import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from "../../components/svg/BackButton/back-button";
import LoginIllustration from "../../components/svg/LoginIllustration/login-illustration";
import { updateUserPassword } from "../../firebase/firebase.utils";
import {
  SuccessToast,
  ErrorToast,
} from "../../components/ToastMessages/ToastMessages";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./change-password.scss";

const ChangePassword = ({ currentUser }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return ErrorToast("Passwords do not match!");
    }

    if (password || password !== "") {
      try {
        const update = updateUserPassword(currentUser, password);
      } catch (err) {
        console.log(err);
      }
    } else {
      return ErrorToast("Error updating password. Please try again.");
    }
  };
  return (
    <div className="change-password">
      <NavLink to="/manage">
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="reauth-illustration">
        <LoginIllustration />
      </div>
      <div className="reauth-title">
        <h1>Change your password</h1>
      </div>
      <form className="reauth-content" onSubmit={(e) => handleSubmission(e)}>
        <div>
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
            label={"Password"}
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={handleChange}
            label={"Confirm Password"}
            required
          />
        </div>
        <CustomButton>Submit</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChangePassword);
