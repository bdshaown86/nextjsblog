import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCMtmUYztmzke_bQz5BqKIoaJ4-Cv3XKqA",
    authDomain: "nextjsblogben.firebaseapp.com",
    projectId: "nextjsblogben",
    storageBucket: "nextjsblogben.appspot.com",
    messagingSenderId: "981236836884",
    appId: "1:981236836884:web:e12f61575b18c6cae61501"
  };


  // Initialize Firebase
  if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

   const auth = firebase.auth()
   const db = firebase.firestore()
   const storage = firebase.storage()
   const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

   export {db,auth,storage,serverTimestamp }
  