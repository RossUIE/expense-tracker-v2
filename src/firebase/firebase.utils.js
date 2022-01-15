import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  getFirestore,
  serverTimestamp,
  getDocs,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCM90V2d6EZzmeGJTNXvFh7rk0pVDao2ow",
  authDomain: "money-tracker-82cae.firebaseapp.com",
  databaseURL: "https://money-tracker-82cae.firebaseio.com",
  projectId: "money-tracker-82cae",
  storageBucket: "money-tracker-82cae.appspot.com",
  messagingSenderId: "709246909889",
  appId: "1:709246909889:web:86ca4dcdd4d0a7cf9b0340",
  measurementId: "G-JWWXNXNDWJ",
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

export const addExpense = async (title, price, category, userAuth) => {
  if (!userAuth) return;

  const expensesRef = firestore.collection(`userData/expenses/${userAuth.id}`);

  const docData = {
    title: title,
    price: price,
    category: category,
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

export const getExpenses = async (userAuth) => {
  if (!userAuth) return;

  const expenseListRef = firestore.collection("userData/expenses/" + userAuth);
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

export const addBudget = async (budget, userAuth) => {
  if (!userAuth) return;

  console.log(budget);
  console.log(userAuth.id);

  const budgetRef = firestore.collection(`userData/budget/` + userAuth.id);

  const docData = {
    budget,
    createdAt: serverTimestamp(),
  };
  try {
    await budgetRef.add(docData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
