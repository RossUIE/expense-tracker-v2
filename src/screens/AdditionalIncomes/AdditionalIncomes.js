import React, { useState, useEffect } from "react";
import IncomeList from "../../components/IncomeList/IncomeList";
import AddIncomeModal from "../../components/AddIncomeModal/AddIncomeModal";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getIncomes, getExpenses } from "../../firebase/firebase.utils";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import monthNames from "../../constants/months";
import Months from "../../components/Months/Months";
import { getTotalAmountSpent } from "../../helpers/getTotalAmountSpent";

import "./additional-incomes.scss";

const AdditionalIncomes = ({ currentUser, month }) => {
  const [incomeModalActive, setIncomeModalActive] = useState(false);
  const [incomes, setIncomes] = useState();
  const [expenses, setExpenses] = useState();

  const toggleIncomeModal = () => {
    setIncomeModalActive((previousValue) => !previousValue);
  };

  const getUserIncomes = async () => {
    try {
      const response = await getIncomes(currentUser.id, month.month).catch(
        console.error
      );
      if (response) {
        setIncomes(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserExpenses = async () => {
    try {
      const response = await getExpenses(currentUser.id, month.month).catch(
        console.error
      );
      if (response) {
        setExpenses(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCalculation = () => {
    return (
      incomes?.reduce((accum, item) => accum + parseFloat(item.price), 0) -
      getTotalAmountSpent(expenses)
    ).toFixed(2);
  };

  useEffect(() => {
    getUserIncomes();
    getUserExpenses();
  }, [currentUser.id, month]);

  return (
    <div className="additionalIncomes">
      <div className="additionalIncomes-summary">
        <h1 className="total-income">
          £{incomes?.reduce((accum, item) => accum + parseFloat(item.price), 0)}
        </h1>
        <p className="income-month">
          Total income for {monthNames[month.month].name}
        </p>
        {expenses && (
          <div className="calculation">
            <div className="number">
              £
              {incomes
                ?.reduce((accum, item) => accum + parseFloat(item.price), 0)
                .toFixed(2)}
              <p className="meta">(Total income)</p>
            </div>

            <p className="operator">-</p>
            <div className="number">
              £{getTotalAmountSpent(expenses)}
              <p className="meta">(Total spent)</p>
            </div>

            <p className="operator">=</p>
            <div className="number">
              £{getCalculation()}
              <p className="meta">(After spending)</p>
            </div>
          </div>
        )}
      </div>
      <div className="tile">
        <Months getIncomes={getUserIncomes} incomes />
        <IncomeList incomes={incomes} getUserIncomes={getUserIncomes} />
      </div>
      <button className="additionalIncomes-add" onClick={toggleIncomeModal}>
        <span className="material-icons">add</span>
      </button>
      <AddIncomeModal
        toggleIncomeModal={toggleIncomeModal}
        active={incomeModalActive}
        userIncomes={getUserIncomes}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  month: selectCurrentMonth,
});

export default connect(mapStateToProps)(AdditionalIncomes);
