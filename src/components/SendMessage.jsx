import React, {useState, useEffect} from 'react'
import {db, auth} from '../firebase'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function SendMessage({rng}) {
  const [msg, setMsg] = useState('')

  const sendMsg = async (event) => {
    event.preventDefault(true)
    if (msg.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, `battles/${rng}/messages`), {
      text: msg,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMsg('')
  }

  return (
    <div>
      <form onSubmit={(e)=>sendMsg(e)}>
        <input type="text" value={msg}  placeholder="type message..." onChange={e => setMsg(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default SendMessage