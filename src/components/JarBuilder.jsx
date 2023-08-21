import React, {useEffect, useState} from 'react'
import Json from './Json'
import trinkets from './trinkets'

const JarBuilder = props => {
  const [jar, setJar] = useState(props.jar)
  const [name, setName] = useState(props.jar.name)
  const [editName, setEditName] = useState(false)
  const [editTrinket, setEditTricket] = useState(0)

  const renderEditName = () => (
    <div style={{height: "67px", display:'flex', justifyContent:"center"}}>
      <input id="jarName"type="text" value={name} onChange={e=>setName(e.target.value)} style={{textAlign:'center', width:'100%'}}/>
      <button onClick={() => {setJar({...jar, name}); setEditName(false)}}>✓</button>
      <button onClick={() => {setName(props.jar.name); setEditName(false)}}>X</button>
    </div>
  )

  useEffect(()=>{
    if(editName){document.getElementById('jarName').focus()}
  },[editName])

  const addButton = item => {
    jar.deck[editTrinket - 1] = trinkets.find(t => item.name === t.name)
    setJar({...jar})
    setEditTricket(0)
  }

  const filteredTrinkets = trinkets.map(t=> ({name: t.name, effect: t.effect}))

  return (
    <div key={editTrinket} style={{width:"100%", height:"100%"}}>
       {editName ? renderEditName() : <h2 onClick={() => {setEditName(true)}} style={{textAlign:'center', width:'100%'}}>{name}</h2>}
      <div style={{width:"100%", height:"50%", display: "flex", justifyContent:"space-around"}}>       
        {jar.deck.length > 1 && jar.deck.map((trinket, i)=>(
          <div onClick={()=>setEditTricket(i + 1)} key={i} style={{border:'solid', width:"11%"}}>
            <div style={
              {background:'black', color:'white'}}>Trinket {i + 1}</div>
            <div >{trinket?.name || "Empty"}</div>
          </div>
        ))}
      </div>
      <div style={{height: "67px", display:'flex', justifyContent:"center"}}>
        {editTrinket ? <div><h3 style={{textAlign:'center', width:'100%'}}>{`Trinket ${editTrinket}`}</h3><Json data={filteredTrinkets} button='Select' buttonFuction={addButton}/></div> :
         <>{!editName && <div style={{width:"100%", marginTop: "10px", display: 'flex', justifyContent: 'center'}} ><button onClick={() => props.save(jar)} style={{width:"11%", margin: "1px"}}>Save</button><button onClick={() => props.cancel({})} style={{width:"11%", margin: "1px"}}>Cancel</button></div>}</>}
      </div>
    </div>
  )
}

export default JarBuilder