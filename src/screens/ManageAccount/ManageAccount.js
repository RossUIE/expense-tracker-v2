import React from "react";
import ProfileIllustration from "../../components/svg/ProfileIllustration/profile-illustration";
import { NavLink } from "react-router-dom";
import BackButton from "../../components/svg/BackButton/back-button";

import "./manage-account.scss";
import ManageAccountOptions from "../../components/ManageAccountOptions/ManageAccountOptions";

export const ManageAccount = () => {
  return (
    <div className="manage-account">
      <NavLink to="/">
        <div className="back">
          <BackButton />
        </div>
      </NavLink>
      <div className="forgot-password-illustration">
        <ProfileIllustration />
      </div>
      <div className="manage-account-content">
        <ManageAccountOptions />
      </div>
    </div>
  );
};

export default ManageAccount;
