// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAft5F2i5ED3pMdRUwUezeBexCQFmYPITI",
  authDomain: "authentication-login-f229c.firebaseapp.com",
  projectId: "authentication-login-f229c",
  storageBucket: "authentication-login-f229c.appspot.com",
  messagingSenderId: "153572169276",
  appId: "1:153572169276:web:038a33ad12ed213b8c9539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
