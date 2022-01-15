import React, { useState } from "react";
import ForgotPasswordIllustration from "../../components/svg/ForgotPasswordIllustration/forgot-password-illsutarion";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from "../../components/svg/BackButton/back-button";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

import "./forgot-password.scss";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    }
  };
  const handleSubmission = (e) => {
    e.preventDefault();

    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setHasError(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setHasError(true);
      });
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
        <CustomButton>Send email</CustomButton>
      </form>
    </div>
  );
};

export default ForgotPassword;
