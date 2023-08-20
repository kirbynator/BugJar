import React, {useState} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'
import Jars from './Jars'

function Home() {
  const[page, setPage] = useState('')
  const[code, setCode] = useState(null)

  
  
  if(page === ''){
    return (
      <div>
        <SignOut/>
        <br/>
        <button onClick={() => setPage("jars")}>Jars</button>
        <br/>
        <br/>
        <button onClick={() => setPage("wait")}>Create Room</button>
        <br/>
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
  } else if(page==='jars'){
    return(
      <Jars setPage={setPage}/>    )
  }
}

export default Home