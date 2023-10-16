
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyC8nxaIF8MwPBU2IUZReYcmPpsMCpFfuJE",
  authDomain: "testmedi-f012a.firebaseapp.com",
  projectId: "testmedi-f012a",
  storageBucket: "testmedi-f012a.appspot.com",
  messagingSenderId: "707651425260",
  appId: "1:707651425260:web:bcf12388d5e11ea61da6c9"

  // apiKey: "AIzaSyAMxWdvOFFkTrx3u4H-W7dwl7TlTy2YPGA",
  // authDomain: "centromedico-4a9f1.firebaseapp.com",
  // projectId: "centromedico-4a9f1",
  // storageBucket: "centromedico-4a9f1.appspot.com",
  // messagingSenderId: "672488154235",
  // appId: "1:672488154235:web:fb5fb02686a71b8029aede",
  // measurementId: "G-TXT9YDL2W3"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
