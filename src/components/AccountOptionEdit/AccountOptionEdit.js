import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BackButton from "../svg/BackButton/back-button";
import FormInput from "../form-input/form-input";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import CustomButton from "../custom-button/custom-button";
import {
  updateProfile,
  updateUserPassword,
} from "../../firebase/firebase.utils";
import { SuccessToast, ErrorToast } from "..//ToastMessages/ToastMessages";

const AccountOptionEdit = ({ option, handleOptionActive, currentUser }) => {
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.displayName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reauthActive, setReauthActive] = useState(false);
  const [nameError, setNameError] = useState(false);

  const toggleReauthModal = () => {
    setReauthActive((previousValue) => !previousValue);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "name") {
      setName(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (option === "name") {
      if (name || name !== "") {
        try {
          const call = updateProfile(currentUser, name);
          if (call) {
            return SuccessToast("Your display name has been updated");
          }
        } catch (err) {
          return ErrorToast("Error updating display name. Please try again.");
        }
      } else {
        setNameError(true);
      }
    }

    if (option === "password") {
      if (password || password !== "") {
        try {
          const update = await updateUserPassword(currentUser, password);
        } catch (err) {
          console.log(err);
        }
      } else {
        return ErrorToast("Error updating password. Please try again.");
      }
    }
  };

  return (
    <div className="account-option-edit">
      <NavLink to="/manage" onClick={handleOptionActive()}>
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="manage-account-title">
        <h1>Change your {option}</h1>
        <form className="edit">
          {option === "name" && (
            <FormInput
              type="text"
              name="name"
              value={name}
              handleChange={handleChange}
              label={"Display Name"}
            />
          )}
          {nameError && (
            <div className="form-error-message">
              Please input a display name.
            </div>
          )}

          {option === "password" && (
            <div>
              <FormInput
                type="password"
                name="password"
                value={password}
                handleChange={handleChange}
                label={"Password"}
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                handleChange={handleChange}
                label={"Confirm Password"}
              />
            </div>
          )}
          <div className="buttons">
            <CustomButton onClick={(e) => handleUpdateProfile(e)}>
              Update {option}
            </CustomButton>
            <NavLink to="/manage" onClick={handleOptionActive()}>
              <CustomButton inverted>Back</CustomButton>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AccountOptionEdit);
