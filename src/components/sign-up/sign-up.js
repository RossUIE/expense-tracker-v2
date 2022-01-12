import React, { useState } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import GoogleLogo from '../svg/GoogleLogo/google-logo';
import SignUpIllustration from "../svg/SignUpIllustration/sign-up-illustration";

import { auth, createUserProfileDocument, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-up.scss";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = signUpData;

    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }

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
      console.log(error);
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
        <GoogleLogo/>
      </CustomButton>
      <p className="or">Or, register with email....</p>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
