import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxwksyzBf0QXEsVJeEWBlFTbtH9be01Tw",
  authDomain: "reventscourse-a3c17.firebaseapp.com",
  databaseURL:
    "https://reventscourse-a3c17-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reventscourse-a3c17",
  storageBucket: "reventscourse-a3c17.appspot.com",
  messagingSenderId: "464028568535",
  appId: "1:464028568535:web:3146ffab01bb746497d992",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
