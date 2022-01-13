import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import ExpensesSummary from '../../components/ExpensesSummary/ExpensesSummary';

import './homepage.scss';
import AddExpenseForm from '../../components/AddExpenseForm/AddExpenseForm';
import BottomNav from '../../components/BottomNav/BottomNav';


export const Home = ({ currentUser }) => {
    return (
      <div className='homepage'>
        <ExpensesSummary />
        <AddExpenseForm/>
        <BottomNav/>
      </div>
    )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Home);