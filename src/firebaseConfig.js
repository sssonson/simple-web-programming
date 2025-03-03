// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2pMY3W707-YJzEhNEm6yOu4VRZmaU1E",
  authDomain: "sample1-9ed2d.firebaseapp.com",
  projectId: "sample1-9ed2d",
  storageBucket: "sample1-9ed2d.firebasestorage.app",
  messagingSenderId: "237774392876",
  appId: "1:237774392876:web:373ad1f4869cd2f0d14b89",
  measurementId: "G-337NCTSY8D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
