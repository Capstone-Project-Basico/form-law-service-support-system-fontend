import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOEV0btcDoUC-Nzs2e0vVvYr2j2xwMHVY",
  authDomain: "capstone-project-417608.firebaseapp.com",
  projectId: "capstone-project-417608",
  storageBucket: "capstone-project-417608.appspot.com",
  messagingSenderId: "311770202840",
  appId: "1:311770202840:web:66c90e2c6956581693cdad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
