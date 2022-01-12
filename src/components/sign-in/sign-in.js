import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import LoginIllustration from "../svg/LoginIllustration/login-illustration";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import GoogleLogo from '../svg/GoogleLogo/google-logo';

import "./sign-in.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
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
        <LoginIllustration/>
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
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label={"Password"}
          required
        />
        <div className="buttons">
          <CustomButton>Sign in</CustomButton>
          <div className="or">Or, sign in with...</div>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            <GoogleLogo/>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
