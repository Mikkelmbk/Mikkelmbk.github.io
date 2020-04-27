// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAa8jFMqCQOeXWUTpsyq7ppXOf66kGPzMA",
    authDomain: "mbk-portfolio.firebaseapp.com",
    databaseURL: "https://mbk-portfolio.firebaseio.com",
    projectId: "mbk-portfolio",
    storageBucket: "mbk-portfolio.appspot.com",
    messagingSenderId: "591695546755",
    appId: "1:591695546755:web:d9d0f06dba21213b994eb6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();