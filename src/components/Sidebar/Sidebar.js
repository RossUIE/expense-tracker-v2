import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Backdrop from "../backdrop/backdrop";

import "./sidebar.scss";

const Sidebar = (props) => {
  return (
    <>
      <div className={props.active ? "c-sidebar active" : "c-sidebar"}>
        <div className="c-sidebar-header">
          <div className={"c-title"}>
            <h3>Settings</h3>
          </div>

          <button className="c-close" onClick={() => props.toggleSidebar}>
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="c-sidebar-items">
          <ul>
            {SidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName}
                  onClick={item.clickHandler}
                >
                  {item.icon}
                  <Link to={item.path} onClick={item.clickHandler}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {props.active && <Backdrop />}
    </>
  );
};

export default Sidebar;
