import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDnLFfpY_Suc9HwJZAOooDwBmqPjPFABEI",
  authDomain: "ecommerce-b8efe.firebaseapp.com",
  projectId: "ecommerce-b8efe",
  storageBucket: "ecommerce-b8efe.appspot.com",
  messagingSenderId: "113442796836",
  appId: "1:113442796836:web:d48a554a9cf913209defb1"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const storage = firebase.storage()

export { projectFirestore, projectAuth, storage }