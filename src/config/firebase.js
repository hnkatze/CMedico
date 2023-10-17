
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

 apiKey: "AIzaSyC8nxaIF8MwPBU2IUZReYcmPpsMCpFfuJE",
  authDomain: "testmedi-f012a.firebaseapp.com",
  projectId: "testmedi-f012a",
  storageBucket: "testmedi-f012a.appspot.com",
  messagingSenderId: "707651425260",
  appId: "1:707651425260:web:bcf12388d5e11ea61da6c9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
