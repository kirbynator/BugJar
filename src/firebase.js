import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: ENV["apiKey"],
    authDomain: ENV["authDomain"],
    projectId: ENV["projectID"],
    storageBucket: ENV["storageBucket"],
    messagingSenderId: ["messagingSenderId"],
    appId: ENV["appId"],
    measurementId: ENV["measurementId"]
})

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db,auth}