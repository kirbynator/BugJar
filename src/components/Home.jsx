import React, {useState} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'

function Home() {
  const[page, setPage] = useState('')
  const[code, setCode] = useState(null)

  
  
  if(page === ''){
    return (
      <div>
        <SignOut></SignOut>
        <button onClick={() => setPage("wait")}>Create Room</button>
        <br/>
        <label>Join Room</label>
        <br/>
        <input type="integer" value={code} onChange={e=>setCode(e.target.value)}/>
        <button onClick={() => setPage("wait")}>Join Room</button>
      </div>
    )
  } else if(page==='wait'){
    return(
      <Battle setPage={setPage} page={page} setCode={setCode} code={code}/>    )
  }
}

export default Home