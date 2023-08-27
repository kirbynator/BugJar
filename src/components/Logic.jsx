import React, {useState, useEffect} from 'react'
import {
  query,
  collection,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from '../firebase'
import attackLogic from './attacks'
import cleanUp from './cleanUp';
import Honeycomb from './Honeycomb';
import './style.css'

function Logic({jar, jug, area, setJar, setJug, setArea, rival, rng, returnHome, updateArena}) {
  const [stage, setStage] = useState('begin')
  const [convo, setConvo] = useState([])
  const [step, setStep] = useState(0)
  const [moves, setMoves] = useState([])
  const [turn, setTurn] = useState(1)
  const [timeline, setTimeline] = useState([])
  const [jarReady, setJarReady] = useState(false)
  const [jugReady, setJugReady] = useState(false)
  const [seeds, setSeeds] = useState([])
  const [death, setDeath] = useState([])

  const beginTurn = () => {
    setStage("turn")
    setStep(jar[0].health === 0 ? 1 : 0)
    setConvo([])
  }

  useEffect(()=>{
    setConvo([`${rival.name} challenges you!`, `${rival.name} sends out ${jug[0].name} and ${jug[1].name}`, `You send out ${jar[0].name} and ${jar[1].name}`, beginTurn])
    setStage('begin')
  },[])

  useEffect(() => {
    const q = query(
      collection(db, `battles/${rng}/turns`),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMoves = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMoves.push({ ...doc.data(), id: doc.id });
      });
      setSeeds(fetchedMoves)
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    if(seeds.length % 2 !== 0){return}
    const seedsTurn = seeds.filter(s => s.uid != rival.uid).length
    const sortedSeeds = seeds.filter(t=>
      t.turn === seedsTurn
    );
    let localTurn = turn
    if(turn < seedsTurn){
      setTurn(seedsTurn)
      localTurn = seedsTurn
    }
    console.log(`trying ${seedsTurn}`)
    if(sortedSeeds.length === 2 && seedsTurn === localTurn){
      console.log(`success ${seedsTurn}`)
      setTurn(seedsTurn + 1)
      setJarReady(true)
      setJugReady(true)
      setStage('convo')
      const attacks = movesArray(sortedSeeds)
      setStep(0)
      setTimeline(attacks)
    }
  },[seeds])

  const movesArray = seed => {
    const a = seed.map(e => e.moves)
    const b = a[0].concat(a[1])
    const rocket = b.filter(c => c.move.pryo === 3).sort((a,b) => {return speedcalc(a) < speedcalc(b) ? -1 : 1}).reverse();
    const quick = b.filter(c => c.move.pryo === 2).sort((a,b) => {return speedcalc(a) < speedcalc(b) ? -1 : 1}).reverse();
    const fast = b.filter(c => c.move.pryo === 1).sort((a,b) => {return speedcalc(a) < speedcalc(b) ? -1 : 1}).reverse();
    const normal = b.filter(c => c.move.pryo === 0).sort((a,b) => {return speedcalc(a) < speedcalc(b) ? -1 : 1}).reverse();
    return [...rocket, ...quick, ...fast, ...normal]
  }

  const speedcalc = (b) => {
    let speed = b.bug.spd
    let i = b.bug.temp?.spd
    if(!i){return speed * 10}
    return speed * 10 * (i > 0 ? ((2 + i) / 2) : (2 / (2 - i)))
  }

  useEffect(()=>{
    if (timeline?.length == Math.min(jar.filter(b=> b.health > 0).length, 2) + Math.min(jug.filter(b=> b.health > 0).length, 2) || death.length > 0 ){
      setDeath([])
      const line = [nextLine]
      setConvo(line)
    }
  },[timeline])

  useEffect(()=>{
    setJarReady(true)
  },[jar])

  useEffect(()=>{
    setJugReady(true)
  },[jug])

  const setArena = () => {
    updateArena()
    setStep(step + 1)
  }

  const nextLine = () => {
    if (jarReady && jugReady){
      if(timeline.length === 0){ return endTurn() }
      setJarReady(false)
      setJugReady(false)
      setStep(0)
      const attack = attackLogic([timeline[0]], jar, jug, area, rival.uid)
      const dialog = attack[0]
      // if(attack[3] !== area){
      //   dialog.push(setArena)
      // }
      setArea(attack[3])
      setJar([...attack[1]])
      setJug([...attack[2]])
      dialog.push(nextLine)
      setConvo(dialog)
      const newtl = timeline
      newtl.shift()
      setTimeline(newtl)
    }
  }

  const endTurn = () => {
    if (jarReady && jugReady){
      setJarReady(false)
      setJugReady(false)
      setStep(0)
      if (death.length === 0) {
        const clean = cleanUp(jar, jug, area, rival.uid)
        const dialog = clean[0]
        setJar([...clean[1]])
        setJug([...clean[2]])
        dialog.push(checkDeaths)
        setConvo(dialog)
      } else {
        setConvo([checkDeaths])
      }
      setStage('convo')
    }
  }

  const checkDeaths = () => {
    const lose = jar.filter(b=> b.health > 0)
    const win = jug.filter(b=> b.health > 0)
    const deaths = []
    if(jar[0].health == 0){deaths.push(0)}
    if(jar[1].health == 0){deaths.push(1)}
    if(win.length === 0){
      setConvo([`${rival.name} is all out of bugs! You win!`, returnHome])
      setStage('over')
    } else if(lose.length === 0){
      setConvo([`You are all out of bugs! ${rival.name} wins`, returnHome])
      setStage('over')
    } else if(deaths.length > 0 && lose.length > 1 ){
      setStep(jar[0].health === 0 && jar[1].health !== 0 ? 0 : 1)
      setStage('switch')
      setDeath(deaths)
      setConvo([])
    } else if ((jug[0].health == 0 || jug[1].health == 0) && win.length > 1) {
      setStage('end')
      setConvo([])
      if(death.length === 0){
        addTurn(turn, [])
      }
      setDeath(['easteregg'])
    } else {
      beginTurn()
    }
  }

  const undoMove = () => {
    const new_moves = moves
    moves.pop()
    setMoves(new_moves)
    setStage('attack')
  }

  const lockMove = () => {
    const b = jar[step]
    if(b.inft === 2 && b.temp?.move){
      selectedMove(b.temp.move)
    }
  }

  const selectedMove = m => {
    const b = jar[step]
    if(b.inft === 2 && !b.temp?.move && m.name != "Crystalize" && m.name != "Metamorphose"){
      b.temp.move = m
    }
    if (m.power || m.name === "Prevention Trap"){
      const a = moves
      const rm = {...m, random: ((Math.floor(Math.random() * 16) + 85) /100)}
      a.push({bug: b, move: rm, target: null})
      setMoves(a)
      setStage('target')
    } else {
      const a = moves
      a.push({bug: b, move: m, target: m.name == 'switch' ? m.target : step - 2, dead: death.length > 0}) 
      setMoves(a)
      setStep(jar.filter(b=> b.health === 0).length > 1 || death.length === 1 ? 2 : step + 1)
      setStage(step === 1 || death.length == 1  ? 'end' : 'turn') 
    }
  }

  const selectedTarget = t => {
    const a = moves
    a[a.length - 1].target = t
    setMoves(a)
    setStep(jar.filter(b=> b.health > 0).length === 1 ? 2 : step + 1)
    setStage(jar.filter(b=> b.health > 0).length === 1 || step >= 1  ? 'end' : 'turn')
  }

  const renderPower = (n) => {
    let power = ""
    if(n === 0) {power = "Special"}
    if(n === 1) {power = "Weak"}
    if(n === 2) {power = "Normal"}
    if(n === 3) {power = "Strong"}
    return <div style={{color:"white", background:"black"}}>{power}</div>
  }

  const sendTurn = () => {
    if(step === 2){
      const localTurn = turn
      const localMoves = moves
      setStep(30)
      addTurn(localTurn, localMoves)
    }
  }

  const addTurn = async (localTurn, localMoves) => {
    const { uid } = auth.currentUser;
    if (seeds.findIndex(i => i.uid === uid && i.turn === localTurn) > 0){return}
    console.log(`Sending turn ${localTurn}`)
    await addDoc(collection(db, `battles/${rng}/turns`), {
      moves: localMoves,
      createdAt: serverTimestamp(),
      turn: localTurn,
      area,
      uid,
    });
    setStep(0)
    setMoves([])
  }

  if (stage === "turn"){
    return (
    <div key={turn} style={{width: "100%", height: "100%", border: "double"}}>{step > 1  && setStage('end')}
      <div style={{width: "100%", height: "10%"}}>{area?.length > 0 ? `The arena is ${area}, ` : '' }What should {jar[step]?.name} do?</div>
      <div style={{width: "100%", height: "70%", display: 'flex'}}>
        <div style={{width: "50%", height: "100%", border: "solid", display: 'flex', alignItems:"center"}} onClick={()=>setStage('attack')}><h1 style={{width: "100%", textAlign:'center'}}>{jar[step]?.temp?.move ? jar[step]?.temp?.move.name : "Attack"}</h1></div>
        <div style={{width: "50%", height: "100%", border: "solid", display: 'flex', alignItems:"center"}} onClick={()=>setStage('switch')}><h1 style={{textAlign:'center', width: "100%",}}>Switch</h1></div>
      </div>
      <div style={{width: "100%", height: "20%", border: "solid", display: 'flex', alignItems:"center"}}>Surrender</div>
    </div>
    )
  } else if(stage === 'attack'){
    let mount = jar[step].moves.length
    return (
      <div key={turn} style={{width: "100%", height: "100%", border: "double"}}>{lockMove()}
        <div style={{width: "100%", height: "10%"}}>What attack should {jar[step]?.name} do?</div>
        <div style={{width: "100%", height: mount > 2 ? "35%" : "70%", display: 'flex'}}>
          <div style={{width: "50%", border: "solid", justifyContent:'center', height: "100%"}} onClick={() => selectedMove(jar[step].moves[0])}>
            <div style={{width: "100%", display: 'flex', justifyContent:'space-around'}}>
              <div style={{width: "50%", textAlign: "center"}}>{jar[step].moves[0].name}</div>
              <div style={{width: "50%", background: "black", textAlign: "center"}}>{renderPower(jar[step].moves[0].power)}</div>
            </div>
              <br/>
            <div style={{textAlign: "center"}}>{jar[step].moves[0].info}</div>
          </div>
          <div style={{width: "50%", border: "solid", justifyContent:'center', height: "100%"}} onClick={() => jar[step].moves[1]?.name && selectedMove(jar[step].moves[1])}>
            <div style={{width: "100%", display: 'flex', justifyContent:'space-around'}}>
              <div style={{width: "50%", textAlign: "center"}}>{jar[step].moves[1]?.name}</div>
              <div style={{width: "50%", background: "black", textAlign: "center"}}>{renderPower(jar[step].moves[1]?.power)}</div>
            </div>
              <br/>
            <div style={{textAlign: "center"}}>{jar[step].moves[1]?.info}</div>
          </div>
        </div>
        {mount > 2 && <div style={{width: "100%", height: "35%", display: 'flex'}}>
          <div style={{width: "50%", border: "solid", justifyContent:'center', height: "100%"}} onClick={() => jar[step].moves[2]?.name && selectedMove(jar[step].moves[2])}>
            <div style={{width: "100%", display: 'flex', justifyContent:'space-around'}}>
              <div style={{width: "50%", textAlign: "center"}}>{jar[step].moves[2]?.name}</div>
              <div style={{width: "50%", background: "black", textAlign: "center"}}>{renderPower(jar[step].moves[2]?.power)}</div>
            </div>
              <br/>
            <div style={{textAlign: "center"}}>{jar[step].moves[2]?.info}</div>
          </div>
          <div style={{width: "50%", border: "solid", justifyContent:'center', height: "100%"}} onClick={() => jar[step].moves[3]?.name && selectedMove(jar[step].moves[3])}>
            <div style={{width: "100%", display: 'flex', justifyContent:'space-around'}}>
              <div style={{width: "50%", textAlign: "center"}}>{jar[step].moves[3]?.name}</div>
              <div style={{width: "50%", background: "black", textAlign: "center"}}>{renderPower(jar[step].moves[3]?.power)}</div>
            </div>
              <br/>
            <div style={{textAlign: "center"}}>{jar[step].moves[3]?.info}</div>
          </div>
        </div>}
        <div style={{width: "100%", height: "20%", border: "solid", display: 'flex', alignItems:"center"}} onClick={()=>setStage('turn')}><div style={{textAlign: "center"}}>Back</div></div>
      </div>
      )
  }else if(stage =="switch"){
    return(
      <div key={turn} style={{width: "100%", height: "100%", border: "double"}}>
        <div style={{width: "100%", height: "10%"}}>{death.length == 0 ? `Who should ${jar[step]?.name} switch into?` : 'Who would you like to send out' }</div>
        <div style={{width: "100%", height: "35%", display: 'flex'}}>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[2]?.name && selectedMove({name: 'switch', target: 2, power: 0, pryo: 3})}>{jar[2]?.name}</div>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[3]?.name && selectedMove({name: 'switch', target: 3, power: 0, pryo: 3})}>{jar[3]?.name}</div>
        </div>
        <div style={{width: "100%", height: "35%", display: 'flex'}}>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[4]?.name && selectedMove({name: 'switch', target:4, power: 0, pryo: 3})}>{jar[4]?.name}</div>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[5]?.name && selectedMove({name: 'switch', target:5, power: 0, pryo: 3})}>{jar[5]?.name}</div>
        </div>
        {death.length == 0 && <div style={{width: "100%", height: "20%", border: "solid", display: 'flex', alignItems:"center"}} onClick={()=>setStage('turn')}><div style={{textAlign: "center"}}>Back</div></div>}
      </div>
    )
  } else if(stage === "target") {
      return (
        <div key={turn} style={{width: "100%", height: "100%", border: "double"}}>
          <div style={{width: "100%", height: "10%"}}>Who should {jar[step]?.name} target?</div>
          <div style={{width: "100%", height: "35%", display: 'flex'}}>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[0]?.name && step === 1 && selectedTarget(-1)}>{step === 1 && jar[0].name}</div>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jug[0]?.name && selectedTarget(1)}>{jug[0].name}</div>
          </div>
          <div style={{width: "100%", height: "35%", display: 'flex'}}>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jar[1]?.name && step === 0 && selectedTarget(-2)}>{step === 0 && jar[1].name}</div>
            <div style={{width: "50%", height: "100%", border: "solid"}} onClick={() => jug[1]?.name && selectedTarget(2)}>{jug[1].name}</div>
          </div>
          <div style={{width: "100%", height: "20%", border: "solid", display: 'flex', alignItems:"center"}} onClick={()=>undoMove()}><div style={{textAlign: "center"}}>Back</div></div>
        </div>
        )
  } else if (stage === "end") {
    return(
      <div key={turn} style={{width: "100%", height: "100%", border: "double"}}>{step >= 2 && sendTurn()}
        <div style={{width: "100%", height: "10%"}}>Waiting on {rival.name}'s selection...</div>
        <div style={{width: "100%", height: "90%", display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Honeycomb/>
        </div>
      </div>
    )
  } else if (convo.length > 0) {
    return (
      <div key={turn} style={{width: "100%", height: "100%", border: "double", display: 'flex', flexDirection:'column', justifyContent: 'space-between'}} onClick={() => setStep(step + 1)}>{
        typeof convo[Math.min(step, convo.length)] === "string" ? convo[Math.min(step, convo.length)] : convo[Math.min(step, convo.length)]()}
        {convo.length > 1 && <div class="blink" style={{textAlign: 'end', width: '100%'}}>
          {'(Proceed)'}
        </div>}
      </div>
    )
  }
}

export default Logic