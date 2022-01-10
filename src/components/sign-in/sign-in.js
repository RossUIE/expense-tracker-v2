import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import RocketAnimation from '../svg/RocketAnimation';

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

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
      <div className="sign-in_logo">
        <RocketAnimation/>
      </div>
      <div className="sign-in_title">
        <h2>Sign in with your email and password</h2>
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
          <CustomButton>Sign In</CustomButton>
          <div className="or">- or -</div>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
