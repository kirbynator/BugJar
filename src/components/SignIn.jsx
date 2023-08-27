import React from 'react'
import {auth} from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <div style={{display: 'flex', justifyContent:'space-between'}}>
      <h1>Bug Jar Battles</h1>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default SignIn