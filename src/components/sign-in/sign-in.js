import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import LoginIllustration from "../svg/LoginIllustration/login-illustration";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import GoogleLogo from "../svg/GoogleLogo/google-logo";
import { ValidateEmail, emptyPassword } from "../../helpers/validateForm";
import { ErrorToast } from "..//ToastMessages/ToastMessages";

import "./sign-in.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (ValidateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (emptyPassword(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (!emailError && !passwordError) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        setEmail("");
        setPassword("");
      } catch (error) {
        ErrorToast(
          "There was a problem logging in. Check your email and password or create an account."
        );
        console.log(error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "password") {
      setPassword(value);
    }

    if (name === "email") {
      setEmail(value);
    }
  };
  return (
    <div className="sign-in">
      <div className="sign-in_illustration">
        <LoginIllustration />
      </div>
      <div className="sign-in_title">
        <h2>Sign in</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label={"Email"}
        />
        {emailError && (
          <div className="form-error-message">Please input a valid email.</div>
        )}
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label={"Password"}
        />
        {passwordError && (
          <div className="form-error-message">Please input a password.</div>
        )}
        <div className="buttons">
          <CustomButton>Sign in</CustomButton>
          <div className="or">Or, sign in with...</div>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            <GoogleLogo />
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
