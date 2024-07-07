import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVLBNa69fAgrSEpky-bGQky9utyxUQTp8",
  authDomain: "travelly-25ba3.firebaseapp.com",
  projectId: "travelly-25ba3",
  storageBucket: "travelly-25ba3.appspot.com",
  messagingSenderId: "1056579220764",
  appId: "1:1056579220764:android:810af1958885adfae1f6d9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;