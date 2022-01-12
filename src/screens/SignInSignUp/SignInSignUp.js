import React, {useState} from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import { NavLink } from 'react-router-dom';
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./SignInSignUp.scss";

const SignInAndSignUpPage = ({currentUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasError, setHasError] = useState(false);

  const switchModehandler = () => {
    setIsLogin((previousValue) => !previousValue);
  }

  return (
    <div className="sign-in-and-sign-up">
      <SignIn/>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
