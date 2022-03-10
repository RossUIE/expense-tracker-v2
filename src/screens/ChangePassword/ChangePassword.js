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
import { ValidatePasswords, emptyPassword } from "../../helpers/validateForm";

import "./change-password.scss";

const ChangePassword = ({ currentUser }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (emptyPassword(password)) {
      setPasswordError(true);
      setPasswordErrorMessage("Please input a password");
      return;
    } else if (ValidatePasswords(password, confirmPassword)) {
      setPasswordError(true);
      setPasswordErrorMessage("Password and confirm password do not match");
      return;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      return;
    } else {
      setPasswordError(false);
    }

    if (password && !passwordError) {
      try {
        const update = await updateUserPassword(currentUser, password).then(
          (res) => {
            if (res.success === true) {
              return SuccessToast(
                "Your password has been successfully updated."
              );
            }
          }
        );
      } catch (err) {
        console.log(err);
        return ErrorToast("Error updating password. Please try again.");
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
          />
          {passwordError && (
            <div className="form-error-message">{passwordErrorMessage}</div>
          )}

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={handleChange}
            label={"Confirm Password"}
          />
          {passwordError && (
            <div className="form-error-message">{passwordErrorMessage}</div>
          )}
        </div>
        <CustomButton>Submit</CustomButton>
        <NavLink to="/manage">
          <CustomButton inverted>Back</CustomButton>
        </NavLink>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChangePassword);
