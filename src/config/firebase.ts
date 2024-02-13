import { initializeApp, } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// FIREBASE_API_KEY="AIzaSyD6EcRSzdFHOggUB5TPgDTA4liagNopUmw"
// FIREBASE_AUTH_DOMAIN="codama-ce92f.firebaseapp.com",
// FIREBASE_PROJECT_ID="codama-ce92f",
// FIREBASE_STORAGE_BUCKET="codama-ce92f.appspot.com",
// FIREBASE_MESSAGING_SENDER_ID="410397664348",
// FIREBASE_APP_ID="1:410397664348:web:d08e8d7b3f8a807d0ef299"

const firebaseConfig = {
  apiKey: 'AIzaSyD6EcRSzdFHOggUB5TPgDTA4liagNopUmw', //import.meta.env.FIREBASE_API_KEY,
  authDomain: "codama-ce92f.firebaseapp.com",
  projectId: 'codama-ce92f',
  storageBucket: "codama-ce92f.appspot.com",
  messagingSenderId: '410397664348',
  appId: "1:410397664348:web:d08e8d7b3f8a807d0ef299"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase);
const db = getFirestore(firebase);
export { auth, firebase, signInWithPhoneNumber, RecaptchaVerifier, db };