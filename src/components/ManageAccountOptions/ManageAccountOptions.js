import React, { useState } from "react";
import AccountOptionEdit from "../AccountOptionEdit/AccountOptionEdit";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import "./manage-account-options.scss";

const ManageAccountOptions = ({ currentUser }) => {
  const [currentOption, setCurrentOption] = useState("");
  const [optionActive, setOptionActive] = useState(false);
  const handleOption = (e) => {
    setCurrentOption(e.currentTarget.id);
    setOptionActive(true);
  };

  const handleOptionActive = () => {
    setOptionActive((previousValue) => !previousValue);
  };
  return (
    <>
      {optionActive ? (
        <AccountOptionEdit
          option={currentOption}
          handleOptionActive={() => handleOptionActive}
        />
      ) : (
        <div className="manage-account-options">
          <h1>Manage your account</h1>
          <div
            className="account-option"
            id="name"
            onClick={(e) => handleOption(e)}
          >
            <p>Change your profile name</p>
            <i className="material-icons">keyboard_arrow_right</i>
          </div>
          <div
            className={
              currentUser?.providerId === "google.com"
                ? "passwordOption googleId"
                : "passwordOption"
            }
          >
            <NavLink to="/manage/reauth">
              <div className="account-option" id="password">
                <p>Change your password</p>
                <i className="material-icons">keyboard_arrow_right</i>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ManageAccountOptions);
