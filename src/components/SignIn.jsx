import React from 'react'
import {auth} from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <div>
        <button onClick={signInWithGoogle}>Sigh In With Google</button>
    </div>
  )
}

export default SignIn