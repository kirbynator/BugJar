import React, {useState, useEffect} from 'react'
import bugs from './bugs'
import ant from '../media/ant.png'
function Jar({jar, jug, setJar, setPage, user}) {
  const [deck, setDeck] = useState([])
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("jar0"))?.deck || [])

  useEffect(()=>{
    if (deck.length === 0){
      const commonBugs = bugs.filter(b => b.rarity === 1)
      const rareBugs = bugs.filter(b => b.rarity === 2)
      const epicBugs = bugs.filter(b => b.rarity === 3)
      const deck = [];
      [1,1,1,2,2,3].map(value=> ({value, sort: Math.random()}) ).sort((a,b) => a.sort - b.sort).map(v => {
        if (v.value === 1){deck.push(commonBug(commonBugs))}
        if (v.value === 2){deck.push(rareBug(rareBugs))}
        if (v.value === 3){deck.push(epicBug(epicBugs))}
      })

      const moveItems = items.filter(i => i.type === "m")
      moveItems.map(i=>{
        const willing = deck.filter(b=> b.moves.findIndex(m=> m.name === i.move.name) === -1 && b.moves.length < 4)
        if(willing.length > 0){ 
          const willer = willing[Math.floor(Math.random()*willing.length)]
          const deckIndex = deck.findIndex(b=> b.id === willer.id)
          deck[deckIndex < 0 ? 0 : deckIndex].moves.push(i.move) 
        }
      })

      const infectItems = items.filter(i => i.type === "i")
      infectItems.map(i=>{
        const healthy = deck.filter(b=> b.inft === 0);
        if(healthy.length > 0){ 
          const sick = healthy[Math.floor(Math.random()*healthy.length)]
          const deckIndex = deck.findIndex(b=> b.id === sick.id)
          if(i.inft === 2){
            sick.atk = sick.atk * 1.5
            sick.spd = sick.spd * 1.5
          }
          sick.inft = i.inft
          deck[deckIndex < 0 ? 0 : deckIndex] = sick
        } 
      })

      const swarm = deck.filter(b=> b.moves.find(m=> m.name === "Swarm"))
      swarm.map(b=>{b.moves.map(m=>{ if(m.name === "Swarm"){ m.power = Math.min(swarm.length, 3)}})})
      setDeck(deck)
    }
  }, [])

  const itemBug = (r, rarityBugs) => {
    if ( Math.floor(Math.random()*10) < 10 - parseInt(r) ) {
      const attrackItems = items.filter(i => i.type === "a" )
      const ratityItems = attrackItems.filter(i => i.rarity.search(r) > -1)
      const item = ratityItems[Math.floor(Math.random()*ratityItems.length)]
      const newItems = items
      newItems.splice(items.findIndex(i => i === item), 1)
      setItems(newItems)
      console.log(`Using ${item.name}`)
      const terms = item.search.split(' ')
      const options = terms.map(t => rarityBugs.filter(b => b.name.search(t) > -1)).flat()
      return options[Math.floor(Math.random()*options.length)]
    } else {
      return rarityBugs[Math.floor(Math.random()*rarityBugs.length)]
    }
  }

  const commonBug = (commonBugs) => {
    const bug = items.filter(i => i.type === "a" && i.rarity.search("1") > -1 ).length > 0 ? itemBug("1", commonBugs) : commonBugs[Math.floor(Math.random()*commonBugs.length)]
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd), inft: 0}
    if (bug.name === "Caterpillar"){bugParams["form"] = Math.floor(Math.random()*2)}
    if (bug.name === "Lacewing Larva"){bugParams["form"] = 5}
    return randomInfect({...bug, ...bugParams})
  }

  const rareBug = (rareBugs) => {
    const bug = items.filter(i => i.type === "a" && i.rarity.search("2") > -1 ).length > 0 ? itemBug("2", rareBugs) : rareBugs[Math.floor(Math.random()*rareBugs.length)]
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd), inft: 0}
    if (bug.name === "Chrysalis"){bugParams["form"] = Math.floor(Math.random()*2)}
    if (bug.name === "Caddisfly Larva"){bugParams["form"] = 4}
    return randomInfect({...bug, ...bugParams})
  }

  const epicBug = (epicBugs) => {
    const bug = items.filter(i => i.type === "a" && i.rarity.search("3") > -1 ).length > 0 ? itemBug("3", epicBugs) : epicBugs[Math.floor(Math.random()*epicBugs.length)]
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd), inft: 0}
    return randomInfect({...bug, ...bugParams})
  }

  const randomInfect = bug => {
    if (1 === Math.floor(Math.random() * 20)){
      bug.inft = Math.floor(Math.random() * 2) + 1
      if(bug.inft === 2){
        bug.atk = bug.atk * 1.5
        bug.spd = bug.spd * 1.5
      }
      return bug
    }else{
      return bug
    }
  }

  const uuid = () =>{
    return Math.floor(Math.random()*100000000)
  }

  const speedCalc = s => {
    return s + Math.random()
  }

  const lead = b => {
    setDeck([b, ...deck.filter(f=>f.id !== b.id)])
  }

  const renderInft = inft => {
    if(inft === 1){
      return "Infected with Cordyceps"
    } else if(inft === 2){
      return "Infected with Hair Worm"
    } else {
      return "Not Infected"
    }
  }
  
  if (deck.length < 6){
    return <h1>Your Bug Jar</h1>
  }else{
  return (
    <div style={{width: "100%", display: 'flex', flexWrap:'wrap', alignItems: 'center', flexDirection:'column'}}>
      <h1>Your Bug Jar</h1>
      {jar.length === 0 && <div style={{display:"flex", width: '80%', maxWidth:"50em", flexDirection:'row', justifyContent:'space-between', margin: '1em'}}>
        <div style={{display:"flex", width: '50%', flexDirection:'row', justifyContent:'space-around'}}><button onClick={()=>{setJar(deck)}}>Confirm Order</button></div>
        <div style={{width: '50%', textAlign:"center"}}>Click a bug to move it to the front of the order</div>
      </div>}
      <div style={{width: "80%", maxWidth:"50em", display: 'flex', flexWrap:'wrap', justifyContent:'space-between', margin: '1em'}}>{
        deck.map((b,i)=>(<div class="card" style={{marginBottom: '3%', height:'100%', width:'40%', borderRadius: '5px', border: 'solid', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.5)'}} onClick={() => lead(b)}>
          <div style={{height: '20%', textAlign:'center', background: 'black', color: 'white'}}>{i + 1}</div>
          <div style={{display:'flex', height: '40%', justifyContent:'space-around', alignItems:'center', marginTop:'3px'}}>
            <div style={{width:"30%", height:'100%'}}>
              <img style={{width:"100%", height:"100%"}} src={`bugs/${b.name.toLowerCase().replaceAll(' ', '')}.png`} alt={ant} />
            </div>
            <div style={{width:"60%", textAlign: 'justify', fontSize: '2.5vw', textAlign: "center"}}>{b.name}</div>
          </div>
          <div style={{height: '20%', textAlign:'center', background: 'black', color: 'white'}}>
            <div style={{color: b.inft > 0 ? "white" : "black"}}>{renderInft(b.inft)}</div>
          </div>
          <div style={{height: '40%', display: 'flex', flexWrap:"wrap", justifyContent:'space-around'}}>
            {b.moves.map(m => (<div style={{maxWidth: '10em', minWidth:'4em', textAlign:'center'}}>{m.name}</div>))}
          </div>
        </div>))
      }</div>
      {jar.length >= 6 && jug.length >= 6 && setPage('battle')}
    </div>
  )
}}

export default Jar