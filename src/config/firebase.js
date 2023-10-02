
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

  
    //here your key of firebase.
    //remenber created collections{product, consultas, usedProduct}
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
