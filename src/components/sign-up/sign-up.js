import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import GoogleLogo from "../svg/GoogleLogo/google-logo";
import SignUpIllustration from "../svg/SignUpIllustration/sign-up-illustration";
import {
  ValidatePasswords,
  ValidateEmail,
  emptyPassword,
} from "../../helpers/validateForm";
import { ErrorToast } from "../ToastMessages/ToastMessages";

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";

import "./sign-up.scss";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [displayNameError, setDisplayNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = signUpData;

    if (!displayName || displayName === "") {
      setDisplayNameError(true);
    } else {
      setDisplayNameError(false);
    }

    if (ValidateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (emptyPassword(password)) {
      setPasswordError(true);
      setPasswordErrorMessage("Please input a password");
    } else if (ValidatePasswords(password, confirmPassword)) {
      console.log("iueabv");
      setPasswordError(true);
      setPasswordErrorMessage("Password and confirm password do not match");
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
    } else {
      setPasswordError(false);
    }

    if (
      displayName &&
      !emailError &&
      !passwordError &&
      password.length >= 6 &&
      !ValidatePasswords(password, confirmPassword)
    ) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDocument(user, { displayName });

        setSignUpData({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          ErrorToast("An account has already been created with this email.");
        }
        console.log(error.code);
      }
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { displayName, email, password, confirmPassword } = signUpData;

  return (
    <div className="sign-up">
      <div className="sign-up-illustration">
        <SignUpIllustration />
      </div>
      <h2 className="title">Sign up</h2>
      <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
        <GoogleLogo />
      </CustomButton>
      <p className="or">Or, register with email....</p>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
        />
        {displayNameError && (
          <div className="form-error-message">Please input a display name.</div>
        )}
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />
        {emailError && (
          <div className="form-error-message">Please input a valid email.</div>
        )}

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />
        {passwordError && (
          <div className="form-error-message">{passwordErrorMessage}</div>
        )}

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
        />
        {passwordError && (
          <div className="form-error-message">{passwordErrorMessage}</div>
        )}
        <div className="submit-button">
          <CustomButton type="submit">Sign up</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
