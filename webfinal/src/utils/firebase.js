import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAtrZM598saLYKE3KCilhMHQKPgDuzHtJY",
    authDomain: "final-project-73ef4.firebaseapp.com",
    projectId: "final-project-73ef4",
    storageBucket: "final-project-73ef4.appspot.com",
    messagingSenderId: "436820483507",
    appId: "1:436820483507:web:df2921281646d7d8a4bfc6"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;