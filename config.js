import * as firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
  apiKey: "AIzaSyBfoesfXjZPm03yAzquthKBB6ix69GmoGQ",
  authDomain: "story-time-8824f.firebaseapp.com",
  databaseURL: "https://story-time-8824f.firebaseio.com",
  projectId: "story-time-8824f",
  storageBucket: "story-time-8824f.appspot.com",
  messagingSenderId: "563110764047",
  appId: "1:563110764047:web:5a9439152f12e709d90d7a"
};
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();