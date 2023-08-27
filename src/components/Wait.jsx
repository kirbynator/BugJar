import React from 'react'
import Honeycomb from './Honeycomb'
import copy from '../media/copy.png'

function Wait({rng, page, setPage, players, returnHome}) {
  const start = () =>{
    if (page === 'ready'){
      setTimeout(()=>{setPage('jar')}, 1000)
    }
  }
  
  return (
    <div>
      {start()}
      <div id="parent" style={{width:'100%', height: "100%", display: 'flex', justifyContent: "center",  alignItems: "center"}}>
        <div style={{display: 'flex', width:'50%', justifyContent: "center"}}>
          <h1>{players[0]?.name}</h1>
          <h3 style={{paddingTop:'32px'}}>vs</h3>
          {players[1]?.name ?
            <h1 style={{paddingTop:'32px'}}>{players[1]?.name}</h1> :
            <div style={{paddingTop:'90px', paddingLeft: 32}}>
              <Honeycomb />
            </div>
          }
        </div>
      </div>
      {!players[1]?.name && <div id="parent" style={{width:'100%', height: "100%", paddingTop:'90px', display: 'flex', justifyContent: "space-around"}}>
        <div style={{width:'30%', display: 'flex', justifyContent: "space-around"}}>
        <div>
          <button onClick={()=>returnHome()}> Return Home </button>
        </div>
        <div>
          <div style={{textDecorationLine: 'underline', textAlign: 'center'}}>Battle Code</div>
          <div onClick={() => {navigator.clipboard.writeText(rng); document.getElementById('success').innerHTML = '✔'}} style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{paddingTop: '2px'}} id='code'>{rng}</div> 
            <div id='success' style={{maxWidth:'20px'}}><img style={{maxWidth:'20px'}} src={copy} /></div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Wait