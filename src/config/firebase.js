
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMxWdvOFFkTrx3u4H-W7dwl7TlTy2YPGA",
  authDomain: "centromedico-4a9f1.firebaseapp.com",
  projectId: "centromedico-4a9f1",
  storageBucket: "centromedico-4a9f1.appspot.com",
  messagingSenderId: "672488154235",
  appId: "1:672488154235:web:fb5fb02686a71b8029aede",
  measurementId: "G-TXT9YDL2W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);