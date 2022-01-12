import React, {useState} from 'react';
import Backdrop from '../backdrop/backdrop';
import HamburgerMenuIcon from '../svg/HamburgerMenuIcon/hambuger-menu-icon';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
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
                    <h1>Expense <span className='title-lower'>Tracker</span></h1>
                </div>

                {currentUser &&
                    <div className='c-header-menu' onClick={() => toggleSidebar()}>
                        <HamburgerMenuIcon />
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