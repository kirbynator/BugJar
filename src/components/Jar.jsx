import React, {useState, useEffect} from 'react'
import bugs from './bugs'
function Jar({jar, jug, setJar, setPage, user}) {
  const [deck, setDeck] = useState([])
  const [sorted, setSorted] = useState([])
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("jar0"))?.deck || [])

  useEffect(()=>{
    if (deck.length === 0){
      const commonBugs = bugs.filter(b => b.rarity === 1)
      const rareBugs = bugs.filter(b => b.rarity === 2)
      const epicBugs = bugs.filter(b => b.rarity === 3)
      const deck = []
      deck.push(commonBug(commonBugs))
      deck.push(commonBug(commonBugs))
      deck.push(commonBug(commonBugs))
      deck.push(rareBug(rareBugs))
      deck.push(rareBug(rareBugs))
      deck.push(epicBug(epicBugs))
      const swarm = deck.filter(b=> b.moves.find(m=> m.name === "Swarm"))
      const moveItems = items.filter(i => i.type === "m")
      moveItems.map(i=>{
        const willing = deck.filter(b=> b.moves.findIndex(m=> m.name === i.move.name) === -1 && b.moves.length < 4)
        if(willing.length > 0){ 
          const willer = willing[Math.floor(Math.random()*willing.length)]
          const deckIndex = deck.findIndex(b=> b.id == willer.id)
          deck[deckIndex < 0 ? 0 : deckIndex].moves.push(i.move) 
        }
      })
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
      newItems.splice(items.findIndex(i => i == item), 1)
      setItems(newItems)
      const terms = item.search.split(' ')
      const options = terms.map(t => rarityBugs.filter(b => b.name.search(t) > -1)).flat()
      debugger
      return options[Math.floor(Math.random()*options.length)]
    } else {
      return rarityBugs[Math.floor(Math.random()*rarityBugs.length)]
    }
  }

  const commonBug = (commonBugs) => {
    const bug = items.filter(i => i.type === "a" ).length > 0 ? itemBug("1", commonBugs) : commonBugs[Math.floor(Math.random()*commonBugs.length)]
    debugger
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd)}
    if (bug.name === "Caterpillar"){bugParams["form"] = Math.floor(Math.random()*2)}
    return ({...bug, ...bugParams})
  }

  const rareBug = (rareBugs) => {
    const bug = items.filter(i => i.type === "a" ).length > 0 ? itemBug("2", rareBugs) : rareBugs[Math.floor(Math.random()*rareBugs.length)]
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd)}
    if (bug.name === "Chrysalis"){bugParams["form"] = Math.floor(Math.random()*2)}
    return ({...bug, ...bugParams})
  }

  const epicBug = (epicBugs) => {
    const bug = items.filter(i => i.type === "a" ).length > 0 ? itemBug("3", epicBugs) : epicBugs[Math.floor(Math.random()*epicBugs.length)]
    const bugParams = {user: user, id: uuid(), temp:{}, health: bug.hp * 10, spd: speedCalc(bug.spd)}
    return ({...bug, ...bugParams})
  }

  const uuid = () =>{
    return Math.floor(Math.random()*100000000)
  }

  const speedCalc = s => {
    return s + Math.random()
  }


  const lead = b => {
    const a = sorted
    a.push(b)
    if(a.length === 6){
      setJar(a)
    }
    setSorted(a)
    setDeck(deck.filter(f=>f.id !== b.id))
  }

  const unlead = b => {
    if (sorted.length < 6){
      const a = deck
      a.push(b)
      setDeck(a)
      setSorted(sorted.filter(f=>f.id !== b.id))
    }
  }

  const shuffleArray = () =>  {
    let array = deck
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    const together = sorted.concat(array)
    setSorted(together)
    setJar(together)
    setDeck([])
}
  
  if (deck.length < 6 && sorted.length < 1){
    return <h1>Your Bug Jar</h1>
  }else{
  return (
    <div style={{width: "100%", display: 'flex', flexDirection:'column', alignItems: 'center'}}>
      <h1>Your Bug Jar</h1>
      <div style={{display:'flex', justifyContent: 'center', marginLeft: '10%'}}>
        <div style={{display:'grid', grid: "auto / auto auto", gridRowGap: "30px", width:"100%"}}>{sorted.map((b, i)=>(<div key={i}>
          <div style={{display:'flex', width:"50%"}} onClick={()=>{unlead(b)}}>
            <div style={{fontSize: '2em'}}>{i + 1}</div>
            <img src="" alt={b.name} />
          </div>
          {b.name}
        </div>))}</div>
      </div>
        <br/>
      {deck.length > 0 &&  <div style={{display:'flex'}}><div>{"Select Order | "}</div><button onClick={() => shuffleArray()}>Randomize Remaining</button></div>}
      <div>{
        deck.map(b=>(<div style={{marginBottom: '3px'}}>
          <button style={{width:"11em"}}key={b.id} onClick={() => lead(b)}>{b.name}</button>
          Attacks: | 
          {b.moves.map(m => (<> {m.name} |</>))}
        </div>))
      }</div>
      {jar.length >= 6 && jug.length >= 6 && setPage('battle')}
    </div>
  )
}}

export default Jar