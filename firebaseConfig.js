import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAUl4wxGe3ixH-7xF9Bqs0B_bu7HxWULqw",
    authDomain: "business-card-987cc.firebaseapp.com",
    databaseURL: "https://business-card-987cc.firebaseio.com",
    projectId: "business-card-987cc",
    storageBucket: "business-card-987cc.appspot.com",
    messagingSenderId: "793870667244",
    appId: "1:793870667244:web:ec4a2f0333669f0ec4c4c9"
  };
  
const firebaseApp =firebase.initializeApp(firebaseConfig)
  export default firebaseApp