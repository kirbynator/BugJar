import React from 'react'

function Wait({rng, page, setPage, players}) {
  const start = () =>{
    if (page === 'ready'){
      setTimeout(()=>{setPage('jar')}, 1000)
    }
  }
  
  return (
    <div>{start()}
      <>{page === 'ready' ? 
        <div style={{display: 'flex'}}><h1>{players[0].name}</h1><h3 style={{paddingTop:'32px'}}>vs</h3><h1 style={{paddingTop:'32px'}}>{players[1].name}</h1></div> :
        <div>Your code:<p>{rng}</p></div>
      }</>  
    </div>
  )
}

export default Wait