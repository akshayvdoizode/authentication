import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC43YelLJGBuJTZhZKpjKp8hL7IhVhJYQ4",
  authDomain: "final-c2cd5.firebaseapp.com",
  projectId: "final-c2cd5",
  storageBucket: "final-c2cd5.appspot.com",
  messagingSenderId: "453694104933",
  appId: "1:453694104933:web:0caf55dd28e30cd247ad8c",
  measurementId: "G-H0L3S8MYGB",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { auth, storage, db };
