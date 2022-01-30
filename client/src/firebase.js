import firebase from 'firebase' ;

const firebaseConfig = {
    apiKey: "AIzaSyAF2cghTvfdL2Xg1DLbP9devL2IFSqlgho",
  authDomain: "spit-hack-2022.firebaseapp.com",
  projectId: "spit-hack-2022",
  storageBucket: "spit-hack-2022.appspot.com",
  messagingSenderId: "14046125032",
  appId: "1:14046125032:web:6f712b2cab4da78440e25d",
  measurementId: "G-E00J4Q5T1Y"
  };
  if(firebase.messaging.isSupported()){
    firebase.initializeApp(firebaseConfig);
    console.log("is supported")
  }else{
    console.log("not supported")
  }
  export default firebase