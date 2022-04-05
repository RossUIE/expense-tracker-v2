import React from "react";
import { auth } from "../../firebase/firebase.utils";

export const SidebarData = [
  {
    title: "My Expenses",
    path: "/",
    icon: <i className="material-icons">receipt_long</i>,
    cName: "manage-link",
  },
  {
    title: "Manage Account",
    path: "/manage",
    icon: <i className="material-icons">person_outline</i>,
    cName: "manage-link",
  },
  {
    title: "Set Budget",
    path: "/setbudget",
    icon: <i className="material-icons">account_balance_wallet</i>,
    cName: "set-budget-link",
  },
  {
    title: "Additional Incomes",
    path: "/additional-incomes",
    icon: <i className="material-icons">wallet</i>,
    cName: "set-budget-link",
  },
  {
    title: "Logout",
    path: "/signin",
    icon: <i className="material-icons">logout</i>,
    cName: "set-budget-link",
    clickHandler: () => auth.signOut(),
  },
];
