import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from "../../components/svg/BackButton/back-button";
import { NavLink } from "react-router-dom";
import { reauth } from "../../firebase/firebase.utils";
import "react-toastify/dist/ReactToastify.css";
import {
  SuccessToast,
  ErrorToast,
} from "../../components/ToastMessages/ToastMessages";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { useHistory } from "react-router-dom";

import "./reauthenticate.scss";
import LoginIllustration from "../../components/svg/LoginIllustration/login-illustration";

const Reauthenticate = ({ currentUser }) => {
  const history = useHistory();

  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmission = async (e) => {
    e.preventDefault();
    const handleReauth = await reauth(currentUser, password).then((res) => {
      console.log(res);
      if (res.success === true) {
        history.push("/manage/password");
      } else {
        return ErrorToast("Password Error");
      }
    });
  };
  return (
    <div className="reauth">
      <NavLink to="/manage">
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="reauth-illustration">
        <LoginIllustration />
      </div>
      <div className="reauth-title">
        <h1>Reauthenticate</h1>
        <p>To change your password, you must enter your current password.</p>
      </div>
      <form className="reauth-content" onSubmit={(e) => handleSubmission(e)}>
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label={"Password"}
          required
        />
        <CustomButton>Submit</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Reauthenticate);
