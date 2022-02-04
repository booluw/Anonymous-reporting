import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC3Rw3IZs7txlt1iHETZ76eKCriPO0Draw",
  authDomain: "report-bullies.firebaseapp.com",
  projectId: "report-bullies",
  storageBucket: "report-bullies.appspot.com",
  messagingSenderId: "845821786650",
  appId: "1:845821786650:web:73d70eee94206bdce06fa3",
  measurementId: "G-LKT986RSCS"
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject)
  })
}

export default firebase;