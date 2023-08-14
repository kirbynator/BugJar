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
        <div>{players[0].name + " vs " + players[1].name}</div> :
        <div>Your code:<p>{rng}</p></div>
      }</>  
    </div>
  )
}

export default Wait