import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCVLBNa69fAgrSEpky-bGQky9utyxUQTp8',
  authDomain: 'travelly-25ba3.firebaseapp.com',
  projectId: 'travelly-25ba3',
  storageBucket: 'travelly-25ba3.appspot.com',
  messagingSenderId: '1056579220764',
  appId: '1:1056579220764:android:810af1958885adfae1f6d9',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getDatabase(app);
const storage = getStorage(app);

export { auth };
export default app;
export { db };
export {storage};