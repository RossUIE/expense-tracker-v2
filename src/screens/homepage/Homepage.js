import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import ExpensesSummary from "../../components/ExpensesSummary/ExpensesSummary";
import Categories from "../../components/Categories/categories";
import { getBudget, getExpenses } from "../../firebase/firebase.utils";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm";
import BottomNav from "../../components/BottomNav/BottomNav";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Months from "../../components/Months/Months";

import "./homepage.scss";

export const Home = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("add-nav");
  const [budget, setBudget] = useState();
  const [expenses, setExpenses] = useState();
  const [query, setQuery] = useState("");

  const handleActiveTab = (e) => {
    const navItem = e.currentTarget.id;
    setActiveTab(navItem);
  };

  const getUserExpenses = async () => {
    try {
      const response = await getExpenses(currentUser.id).catch(console.error);
      if (response) {
        setExpenses(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserBudgets = async () => {
    try {
      const response = await getBudget(currentUser.id).catch(console.error);
      if (response) {
        setBudget(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSearchQuery = (query) => {
    setQuery(query);
  };

  let filteredExpenses = expenses;

  if (query) {
    filteredExpenses = expenses?.filter((expense) => {
      return expense.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  useEffect(() => {
    getUserBudgets();
  }, [currentUser.id]);

  useEffect(() => {
    getUserExpenses();
  }, [currentUser.id]);

  return (
    <div className="homepage">
      <ExpensesSummary budget={budget} expenses={expenses} />
      {activeTab === "add-nav" && (
        <AddExpenseForm userExpenses={() => getUserExpenses()} />
      )}
      {activeTab === "expenses-nav" && (
        <>
          <SearchBar queryValue={getSearchQuery} />
          <Months />
          <ExpenseList
            expenses={filteredExpenses}
            getUserExpenses={getUserExpenses}
          />
        </>
      )}
      {activeTab === "category-nav" && (
        <>
          <Months />
          <Categories expenses={expenses} />
        </>
      )}
      <BottomNav handleActiveTab={(id) => handleActiveTab(id)} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Home);
