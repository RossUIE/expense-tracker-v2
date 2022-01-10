import React, {useState} from 'react';
import Backdrop from '../backdrop/backdrop';
import RocketIcon from '../svg/RocketIcon';
import SettingsIcon from '../svg/settingsIcon';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

import './header.scss';

const Header = ({ currentUser, hidden }) => {

    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive((previousValue) => !previousValue);
    }

    const backdropClickHandler = () => {
        setSidebarActive(false);
    }
    return (
        <div className="c-header">
            <div className="c-header_content">
                <div className="c-header_title">
                    <RocketIcon/>
                    <h1>Expense Tracker</h1>
                </div>
                {currentUser &&
                    <div className="c-header_settings" onClick={toggleSidebar}>
                        <SettingsIcon />
                    </div>
                }
            </div>
            {sidebarActive &&
                <Backdrop backdropClickHandler={backdropClickHandler}/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  });
  
  export default connect(mapStateToProps)(Header);