import React, { useState } from "react";
import ForgotPasswordIllustration from "../../components/svg/ForgotPasswordIllustration/forgot-password-illsutarion";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from "../../components/svg/BackButton/back-button";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import "react-toastify/dist/ReactToastify.css";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/ToastMessages/ToastMessages";

import "./forgot-password.scss";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    }
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    if (email === "" || !email) {
      setHasError(true);
      return;
    }
    try {
      auth
        .sendPasswordResetEmail(email)
        .then(function () {
          setHasError(false);
          setEmail("");
          return SuccessToast("An email has been sent to your inbox.");
        })
        .catch(function (error) {
          if (error.code === "auth/user-not-found") {
            return ErrorToast("An account using this email was not found.");
          }
          setHasError(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forgot-password">
      <NavLink to="/signin">
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="forgot-password-illustration">
        <ForgotPasswordIllustration />
      </div>
      <div className="forgot-password-title">
        <h1>Forgot password</h1>
        <p>
          Input your email address below and an email will be sent to your inbox
        </p>
      </div>
      <form
        className="forgot-password-content"
        onSubmit={(e) => handleSubmission(e)}
      >
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label={"Email"}
          required
        />
        {hasError && (
          <div className="form-error-message">Please input a valid email.</div>
        )}
        <div className="buttons">
          <CustomButton>Send email</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
