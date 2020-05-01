import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDzw61-uVVoMmkKI3MtH3MqC3jC-sZF8I4",
    authDomain: "revents-e38d5.firebaseapp.com",
    databaseURL: "https://revents-e38d5.firebaseio.com",
    projectId: "revents-e38d5",
    storageBucket: "revents-e38d5.appspot.com",
    messagingSenderId: "670885516951",
    appId: "1:670885516951:web:707a85f4244a784abfbbd2"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;