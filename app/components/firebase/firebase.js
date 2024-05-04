// firebase.js
import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGkDDZjsR8ZytmJUNzv2id_svqllT0ANA",
  authDomain: "hux-codingtest.firebaseapp.com",
  projectId: "hux-codingtest",
  storageBucket: "hux-codingtest.appspot.com",
  messagingSenderId: "574464129496",
  appId: "1:574464129496:web:a3b4283efa076f6f779aad",
};

// Check if Firebase is already initialized to avoid multiple initializations
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
