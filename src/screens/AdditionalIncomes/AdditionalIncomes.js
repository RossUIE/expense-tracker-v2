import React, { useState, useEffect } from "react";
import IncomeList from "../../components/IncomeList/IncomeList";
import AddIncomeModal from "../../components/AddIncomeModal/AddIncomeModal";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getIncomes } from "../../firebase/firebase.utils";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import monthNames from "../../constants/months";
import Months from "../../components/Months/Months";

import "./additional-incomes.scss";

const AdditionalIncomes = ({ currentUser, month }) => {
  const [incomeModalActive, setIncomeModalActive] = useState(false);
  const [incomes, setIncomes] = useState();

  const toggleIncomeModal = () => {
    setIncomeModalActive((previousValue) => !previousValue);
  };

  const getUserIncomes = async (month) => {
    try {
      const response = await getIncomes(currentUser.id, month).catch(
        console.error
      );
      if (response) {
        setIncomes(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserIncomes();
  }, [currentUser.id]);

  return (
    <div className="additionalIncomes">
      <div className="additionalIncomes-summary">
        <h1 className="total-income">
          £{incomes?.reduce((accum, item) => accum + parseFloat(item.price), 0)}
        </h1>
        <p>Total additional income for {monthNames[month.month].name}</p>
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
