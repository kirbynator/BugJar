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
        (a, b) => b.createdAt - a.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div style={{width: '100%', height:"100%", paddingTop: '1px'}}>
      <div style={{overflow:"hidden", width: '100%', height:"92%", display:'flex', flexDirection:'column-reverse'}}>
        {messages.map(({id, text, name}) => (
          <div key={id} style={{paddingBottom:"5px"}}>
            <div style={{color:"white", background:"black"}}>{name}</div>
            <div>{text}</div>
          </div>
        ))}
      </div>
        <SendMessage rng={rng}></SendMessage>
    </div>
  )
}

export default Chat