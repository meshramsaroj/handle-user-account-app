import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyANVM0IocnuHtrWDSP30xtd-Y8OnxyrUAA",
  authDomain: "handle-user-account.firebaseapp.com",
  databaseURL: "https://handle-user-account.firebaseio.com",
  projectId: "handle-user-account",
  storageBucket: "handle-user-account.appspot.com",
  messagingSenderId: "66951275100",
  appId: "1:66951275100:web:225a01197eb6a466c0bc99",
  measurementId: "G-QLS38P9YGW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
