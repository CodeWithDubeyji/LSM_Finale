// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getFireStore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: JSON.stringify(import.meta.env.VITE_API_KEY),
  authDomain: JSON.stringify(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: JSON.stringify(import.meta.env.VITE_PROJECT_ID),
  storageBucket: JSON.stringify(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: JSON.stringify(import.meta.env.VITE_MESSAGE_SENDER_ID),
  appId: JSON.stringify(import.meta.env.VITE_APP_ID),
  measurementId: JSON.stringify(import.meta.env.VITE_MEASUREMENT_ID)
};

console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const database = getFireStore(app);
const analytics = getAnalytics(app);