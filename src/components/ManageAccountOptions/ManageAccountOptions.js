import React from "react";

import "./manage-account-options.scss";

const ManageAccountOptions = () => {
  return (
    <div className="manage-account-options">
      <div className="account-option">
        <div className="account-option-content">
          <p>Change your profile name</p>
          <i className="material-icons">keyboard_arrow_right</i>
        </div>
      </div>

      <div className="account-option">
        <div className="account-option-content">
          <p>Change your email</p>
          <i className="material-icons">keyboard_arrow_right</i>
        </div>
      </div>

      <div className="account-option">
        <div className="account-option-content">
          <p>Change your password</p>
          <i className="material-icons">keyboard_arrow_right</i>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountOptions;
