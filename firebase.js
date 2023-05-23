// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDrCAlALtv0qXHk7voCBMzwgXRZ4AEyaP4",
  authDomain: "linkedlistdb-9c236.firebaseapp.com",
  projectId: "linkedlistdb-9c236",
  storageBucket: "linkedlistdb-9c236.appspot.com",
  messagingSenderId: "321084186868",
  appId: "1:321084186868:web:d6fc65ca357a3d7e033ea1"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;