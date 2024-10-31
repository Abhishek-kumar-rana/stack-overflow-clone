import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.firebase_apikey,
  authDomain: "web-push-n.firebaseapp.com",
  projectId: "web-push-n",
  storageBucket: "web-push-n.appspot.com",
  messagingSenderId: "640886929343",
  appId: "1:640886929343:web:fcee0dfa50e98c7483930a",
  measurementId: "G-TENDLTY2JX"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default messaging;
