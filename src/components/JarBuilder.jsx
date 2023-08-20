import { render } from '@testing-library/react'
import React, {useEffect, useState} from 'react'

const JarBuilder = props => {
  const [jar, setJar] = useState(props.jar)
  const [name, setName] = useState(props.jar.name)
  const [editName, setEditName] = useState(false)
  const [editTrinket, setEditTricket] = useState(false)

  const renderEditName = () => (
    <div style={{height: "67px", display:'flex', justifyContent:"center"}}>
      <input id="name"type="text" value={name} onChange={e=>setName(e.target.value)} style={{textAlign:'center', width:'100%'}}/>
      <button onClick={() => {setJar({...jar, name}); setEditName(false)}}>✓</button>
      <button onClick={() => {setName(props.jar.name); setEditName(false)}}>X</button>
    </div>
  )

  useEffect(()=>{
    if(editName){document.getElementById('name').focus()}
  },[editName])

  return (
    <div style={{width:"100%", height:"100%"}}>
       {editName ? renderEditName() : <h2 onClick={() => {setEditName(true)}} style={{textAlign:'center', width:'100%'}}>{name}</h2>}
      <div style={{width:"100%", height:"50%", display: "flex", justifyContent:"space-around"}}>       
        {jar.deck.length > 1 && jar.deck.map((trinket, i)=>(
          <div key={i} style={{border:'solid', width:"11%"}}>
            <div style={
              {background:'black', color:'white'}}>Slot {i + 1}</div>
            <div >{trinket?.name || "Empty"}</div>
          </div>
        ))}
      </div>
      <div style={{height: "67px", display:'flex', justifyContent:"center"}}>
        {editTrinket ? <></> : <>{!editName && <><button onClick={() => props.save(jar)} style={{width:"66px", margin: "1px"}}>Save</button><button onClick={() => props.cancel({})} style={{width:"66px", margin: "1px"}}>Cancel</button></>}</>}
      </div>
    </div>
  )
}

export default JarBuilder