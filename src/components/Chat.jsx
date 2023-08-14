import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import SendMessage from './SendMessage';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

function Chat({rng}) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, `battles/${rng}/messages`),
      orderBy("createdAt", "desc"),
      limit(6)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div>
      {messages.map(({id, text, name}) => (
        <div key={id}>
          <div style={{color:"white", background:"black"}}>{name}</div>
          <div>{text}</div>
        </div>
      ))}
      <div style={{margin:'3px'}}/>
      <SendMessage rng={rng}></SendMessage>
    </div>
  )
}

export default Chat