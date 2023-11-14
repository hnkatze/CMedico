
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
//Crete your collections and paste your api key here

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
