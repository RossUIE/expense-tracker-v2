import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./screens/homepage/Homepage";
import SignInAndSignUpPage from "./screens/SignInSignUp/SignInSignUp";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import Header from "./components/header/header";
import ForgotPassword from "./screens/ForgotPassword/forgot-password";
import SetBudget from "./screens/SetBudget/SetBudget";
import { ToastContainer } from "react-toastify";
import ManageAccount from "./screens/ManageAccount/ManageAccount";
import Reauthenticate from "./screens/Reauthenticate/Reauthenticate";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import AdditionalIncomes from "./screens/AdditionalIncomes/AdditionalIncomes";

function App(props) {
  const { setCurrentUser } = props;
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const providerId = userAuth.providerData[0].providerId;
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
            providerId,
          });
        });
      }
      setCurrentUser(userAuth);
    });
    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}>
          {!props.currentUser && <Redirect push to="/signin" />}
        </Route>
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/setbudget" component={SetBudget}>
          {!props.currentUser && <Redirect push to="/signin" />}
        </Route>
        <Route
          exact
          path="/signin"
          render={() =>
            props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/manage" component={ManageAccount}>
          {!props.currentUser && <Redirect push to="/signin" />}
        </Route>
        <Route exact path="/additional-incomes" component={AdditionalIncomes}>
          {!props.currentUser && <Redirect push to="/signin" />}
        </Route>
        <Route exact path="/manage/reauth" component={Reauthenticate} />
        <Route exact path="/manage/password" component={ChangePassword} />
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
