
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCcnCNex6Bsopb3gV2AADelmzRJWwHTKh4",
  authDomain: "foodie-72a07.firebaseapp.com",
  projectId: "foodie-72a07",
  storageBucket: "foodie-72a07.firebasestorage.app",
  messagingSenderId: "133904245117",
  appId: "1:133904245117:web:27a300bf8670952b68ec14",
  measurementId: "G-CCJX7V7M33"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
