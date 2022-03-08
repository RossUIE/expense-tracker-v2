import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  getFirestore,
  serverTimestamp,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { getFirstDayOfMonth, getLastDayOfMonth } from "../helpers/dateHelper";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addExpense = async (title, price, category, userAuth, month) => {
  if (!userAuth) return;

  const expensesRef = firestore.collection(`userData/expenses/${userAuth.id}`);

  const first = getFirstDayOfMonth(month.month);

  const docData = {
    title: title,
    price: price,
    category: category,
    timestamp: month ? first : Timestamp.now().seconds,
    createdAt: serverTimestamp(),
  };
  try {
    await expensesRef.add(docData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getExpenses = async (userAuth, selectedMonth) => {
  if (!userAuth) return;

  if (selectedMonth === undefined) {
    const d = new Date();
    selectedMonth = d.getMonth();
  }

  const first = getFirstDayOfMonth(selectedMonth);
  const last = getLastDayOfMonth(selectedMonth);

  const expenseListRef = firestore
    .collection("userData/expenses/" + userAuth)
    .where("timestamp", ">=", first)
    .where("timestamp", "<", last);
  let expenses = [];

  const docs = await getDocs(expenseListRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        expenses.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return expenses;
};

export const deleteExpense = async (userAuth, expenseId) => {
  if (!userAuth) return;

  await deleteDoc(doc(db, "userData", "expenses", userAuth, expenseId))
    .then((res) => {
      console.log("deleted", expenseId);
    })
    .catch(console.error);
};

export const editExpense = async (
  userAuth,
  title,
  price,
  category,
  expenseId
) => {
  if (!userAuth) return;

  const docData = {
    title,
    price,
    category,
  };

  await updateDoc(doc(db, "userData", "expenses", userAuth, expenseId), docData)
    .then((res) => {
      console.log("Edited: ", expenseId);
    })
    .catch(console.error);
};

export const addBudget = async (budget, userAuth) => {
  if (!userAuth) return;

  const budgetRef = firestore
    .collection("userData")
    .doc("monthly-budgets")
    .collection(userAuth.id)
    .doc("budget");

  const docData = {
    budget,
    createdAt: serverTimestamp(),
  };
  try {
    await setDoc(budgetRef, docData);
  } catch (error) {
    console.log(error);
  }
};

export const getBudget = async (userAuth) => {
  if (!userAuth) return;

  const budgetRef = firestore
    .collection("userData")
    .doc("monthly-budgets")
    .collection(userAuth)
    .doc("budget");

  const docSnap = await getDoc(budgetRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const updateProfile = async (userAuth, data) => {
  if (!userAuth) return;

  const docData = {
    displayName: data,
  };

  await updateDoc(doc(db, "users", userAuth.id), docData)
    .then((res) => {
      console.log("Edited User: ", docData);
    })
    .catch(console.error);
};

export const reauth = async (userAuth, userProvidedPassword) => {
  if (!userAuth) return;
  const auth = getAuth();

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    userProvidedPassword
  );

  const result = await reauthenticateWithCredential(
    auth.currentUser,
    credential
  )
    .then((res) => {
      return { success: true };
    })
    .catch((error) => {
      console.log(error.status);
      return error.code;
    });

  return result;
};

export const updateUserPassword = async (userAuth, newPassword) => {
  if (!userAuth) return;
  const auth = getAuth();

  const user = auth.currentUser;
  const req = await updatePassword(user, newPassword)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.log(error.code);
      return error.code;
    });

  return req;
};

const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
