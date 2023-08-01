import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_JuhxUzm2f8P90WjRjFosBykCh_7QTUk",
  authDomain: "yasas-ekanayaka-portfolio.firebaseapp.com",
  projectId: "yasas-ekanayaka-portfolio",
  storageBucket: "yasas-ekanayaka-portfolio.appspot.com",
  messagingSenderId: "165064275063",
  appId: "1:165064275063:web:0fb97cfe7e7e07b482c272",
  measurementId: "G-5KMFWBC9J9",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getFirestore(app);
export const storage = getStorage(app);
