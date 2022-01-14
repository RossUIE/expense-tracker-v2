import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import ExpensesSummary from "../../components/ExpensesSummary/ExpensesSummary";
import Categories from "../../components/Categories/categories";

import "./homepage.scss";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm";
import BottomNav from "../../components/BottomNav/BottomNav";
import ExpenseList from "../../components/ExpenseList/ExpenseList";

export const Home = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("add-nav");

  const handleActiveTab = (e) => {
    const navItem = e.currentTarget.id;
    setActiveTab(navItem);
  };

  return (
    <div className="homepage">
      <ExpensesSummary />
      {activeTab === "add-nav" && <AddExpenseForm />}
      {activeTab === "expenses-nav" && <ExpenseList />}
      {activeTab === "category-nav" && <Categories />}
      <BottomNav handleActiveTab={(id) => handleActiveTab(id)} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Home);
