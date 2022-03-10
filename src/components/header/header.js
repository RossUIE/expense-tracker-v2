import React, { useState } from "react";
import HamburgerMenuIcon from "../svg/HamburgerMenuIcon/hambuger-menu-icon";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { connect } from "react-redux";

import "./header.scss";
import Sidebar from "../Sidebar/Sidebar";

const Header = ({ currentUser }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive((previousValue) => !previousValue);
  };

  return (
    <div className="c-header">
      <div className="c-header_content">
        <div className="c-header_title">
          <h1>
            Expenses <span className="title-lower">Tracker</span>
          </h1>
        </div>

        {currentUser && (
          <div className="c-header-menu" onClick={() => toggleSidebar()}>
            <HamburgerMenuIcon />
            <Sidebar toggleSidebar={toggleSidebar} active={sidebarActive} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
