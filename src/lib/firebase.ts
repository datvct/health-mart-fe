// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyApSmpPZMVc0PPat0Rwys9-jd2_wW0JSJk',
  authDomain: 'healthmart-1343e.firebaseapp.com',
  projectId: 'healthmart-1343e',
  storageBucket: 'healthmart-1343e.firebasestorage.app',
  messagingSenderId: '10103424726',
  appId: '1:10103424726:web:f9b2f7854f09ec2fb3ab77',
  measurementId: 'G-C1X1X13FQB',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyApSmpPZMVc0PPat0Rwys9-jd2_wW0JSJk",
//   authDomain: "healthmart-1343e.firebaseapp.com",
//   projectId: "healthmart-1343e",
//   storageBucket: "healthmart-1343e.firebasestorage.app",
//   messagingSenderId: "10103424726",
//   appId: "1:10103424726:web:f9b2f7854f09ec2fb3ab77",
//   measurementId: "G-C1X1X13FQB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
