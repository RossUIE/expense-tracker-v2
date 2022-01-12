import React, {useState} from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./SignInSignUp.scss";

const SignInAndSignUpPage = ({currentUser}) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchModehandler = () => {
    setIsLogin((previousValue) => !previousValue);
  }

  return (
    <div className="sign-in-and-sign-up">
      {
        isLogin ? <SignIn/> : <SignUp/>
      }
      
      <div className="c-container-signUp">
        {isLogin ?
          <div>
              <p>Dont have an account? <span className="brand-text-color" onClick={switchModehandler}>Register</span></p> 
              <p className="c-forgot-password_link "><NavLink to="/forgotpassword">Forgot password?</NavLink></p>
          </div>
              :
          <p>Already have an account? <span className="brand-text-color" onClick={switchModehandler}>Login</span></p> 
        }
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
