import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_.apiKey,
    authDomain: process.env.REACT_APP_.authDomain,
    projectId: process.env.REACT_APP_.projectId,
    storageBucket: process.env.REACT_APP_.storageBucket,
    messagingSenderId: process.env.REACT_APP_.messagingSenderId,
    appId: process.env.REACT_APP_.appId,
    measurementId: process.env.REACT_APP_.measurementId
})

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db,auth}