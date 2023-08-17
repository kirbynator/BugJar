import React, {useState, useEffect, useLayoutEffect} from 'react'
import Wait from './Wait'
import Jar from './Jar'
import Logic from './Logic';
import Chat from './Chat';
import { auth, db } from '../firebase'
import {
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";


function Battle(props) {
  const [rng, setRng] = useState(props?.code || Math.floor(Math.random()*100000))
  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(props.page)
  const [jar, setJar] = useState([])
  const [jug, setJug] = useState([])
  const [area, setArea] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {sendPlayer()},[])

  useEffect(() => {
    const q = query(
      collection(db, `battles/${rng}/players`),);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedPlayers = [];
      QuerySnapshot.forEach((doc) => {
        fetchedPlayers.push({ ...doc.data(), id: doc.id });
      });
      if (fetchedPlayers.length >= 2){
        const { uid } = auth.currentUser;
        setPage('ready')
      }
      setPlayers(fetchedPlayers);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const { uid } = auth.currentUser;
    const q = query(
      collection(db, `battles/${rng}/jars`),);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedJars = [];
      QuerySnapshot.forEach((doc) => {
        fetchedJars.push({ ...doc.data(), id: doc.id });
      });
    fetchedJars.forEach(j => j.uid === uid ? setJar(j.jar) : setJug(j.jar))
    });
    return () => unsubscribe;
  }, []);

  const sendPlayer = async () => {
    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, `battles/${rng}/players`), {
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    if(!user){setUser(uid)}
  }

  const setDeck = async (deck) => {
    await addDoc(collection(db, `battles/${rng}/jars`), {
      jar: deck,
      uid: user,
    });
  }

  const renderHp = (health, max) => {
    const wdth = 10/max
    let i = 0
    let a = []
    while (i < health){
      i++
      a.push(wdth)
    }
    return(a)
  }

  const returnHome = () => {
    props.setCode(null)
    props.setPage('')
  }  

  if (page === 'wait' || page === 'ready' ){
    return(
      <Wait rng={rng} page={page} setPage={setPage} players={players}/>
    )
  } else if (page === 'jar'){
  return (
    <Jar jar={jar} jug={jug} user={user} setJar={setDeck} setPage={setPage}/>
  )
  } else if (page === 'battle'){
    const player = players.find(p=> p.uid === user)
    const rival = players.find(p=> p.uid !== user)
    return(
      <div style={{width: "100%", height: window.screen.height, display:'flex', flexDirection: 'column'}}>
        <div style={{width:"100%", height: "5%", display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div style={{width:"40%", display:'flex', justifyContent:'flex-start'}}>
            <img src={player.avatar} alt="" />
            <div style={{padding: "3%"}}>{player.name}</div>
          </div>
          <div style={{width:"30%", display:'flex', justifyContent:'flex-end'}}>
            <div style={{padding: "3%"}}>{rival.name}</div>
            <img src={rival.avatar} alt="" />
          </div>
        </div>
        <div style={{width:"100%",  height: "30%", display:'flex', justifyContent:'space-between', alignItems:"center"}}>
          <div style={{display: 'flex',  width:"40%"}}>
            <img src="" alt={jar[0].name} />
            <img src="" alt={jar[1].name} />
          </div>
          <div style={{display: 'flex',  width:"40%", justifyContent:'flex-end'}}>
            <img style={{transform: 'scaleX(-1)'}} src="" alt={jug[0].name} />
            <img style={{transform: 'scaleX(-1)'}} src="" alt={jug[1].name} />
          </div>
        </div>
        <div style={{width:"100%",  height: "15%", display:'flex', justifyContent:'space-between', border: 'solid' }}>
          <div style={{display: 'flex',  width:"40%", flexDirection: 'column', justifyContent:'space-around', margin: '1em'}}>
            <div style={{width:"100%", height: "100%"}}>
              <div style={{display: 'flex',  width:"100%", justifyContent:'space-between'}}>
                <div>{jar[0].name}</div> 
                {jar[0].temp?.ill && <div style={{color:"white", background:"black", paddingLeft:'1%', paddingRight:'1%'}}>ill</div>}
              </div>
              <div style={{width:"100%", height: "10%", display:'flex', flexDirection:'row', border: 'dashed'}}>{renderHp(jar[0].health, jar[0].hp).map(w=> (<div style={{color: 'black', background: 'black', width: `${w}%`, height: '100%'}}/>))}</div>
              <div>{jar[0]?.health}/{jar[0].hp*10}</div>
            </div>
            <div style={{width:"100%", height: "100%"}}>
              <div style={{display: 'flex',  width:"100%", justifyContent:'space-between'}}>
                <div>{jar[1].name}</div> 
                {jar[1].temp?.ill && <div style={{color:"white", background:"black", paddingLeft:'1%', paddingRight:'1%'}}>ill</div>}
              </div>
              <div style={{width:"100%", height: "10%", display:'flex', flexDirection:'row', border: 'dashed'}}>{renderHp(jar[1].health, jar[1].hp).map(w=> (<div style={{color: 'black', background: 'black', width: `${w}%`, height: '100%'}}/>))}</div>
              <div>{jar[1]?.health}/{jar[1].hp*10}</div>
            </div>
          </div>
          <div style={{display: 'flex',  width:"40%", flexDirection: 'column', justifyContent:'space-around', margin: '1em'}}>
          <div style={{width:"100%", height: "100%"}}>
            <div style={{display: 'flex',  width:"100%", justifyContent:'space-between'}}>
                <div>{jug[0].name}</div> 
                {jug[0].temp?.ill && <div style={{color:"white", background:"black", paddingLeft:'1%', paddingRight:'1%'}}>ill</div>}
              </div>
              <div style={{width:"100%", height: "10%", display:'flex', flexDirection:'row', border: 'dashed'}}>{renderHp(jug[0].health, jug[0].hp).map(w=> (<div style={{color: 'black', background: 'black', width: `${w}%`, height: '100%'}}/>))}</div>
              <div>{jug[0]?.health}/{jug[0].hp*10}</div>
            </div>
            <div style={{width:"100%", height: "100%"}}>
              <div style={{display: 'flex',  width:"100%", justifyContent:'space-between'}}>
                <div>{jug[1].name}</div> 
                {jug[1].temp?.ill && <div style={{color:"white", background:"black", paddingLeft:'1%', paddingRight:'1%'}}>ill</div>}
              </div>
              <div style={{width:"100%", height: "10%", display:'flex', flexDirection:'row', border: 'dashed'}}>{renderHp(jug[1].health, jug[1].hp).map(w=> (<div style={{color: 'black', background: 'black', width: `${w}%`, height: '100%'}}/>))}</div>
              <div>{jug[1]?.health}/{jug[1].hp*10}</div>
            </div>
          </div>
        </div>
        <div key={area} style={{width:"100%",  height: "30%", display:'flex', justifyContent:'space-between'}}>
          <div style={{width:"78%", height: "100%"}}>
            <Logic jar={jar} jug={jug} area={area} rival={rival} rng={rng} setJar={setJar} setJug={setJug} setArea={setArea} returnHome={returnHome}/>
          </div>
          <div style={{width:"21%", height: "100%"}}>
            <Chat rng={rng}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Battle