
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_WmmpiCiAMxZNQ4SS-yD057MlmKIQfBg",
  authDomain: "medical-care-526f6.firebaseapp.com",
  projectId: "medical-care-526f6",
  storageBucket: "medical-care-526f6.firebasestorage.app",
  messagingSenderId: "353729813137",
  appId: "1:353729813137:web:8d1465bcd4614581743d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
