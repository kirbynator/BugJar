import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'
import Jars from './Jars'

function Home() {
  const[page, setPage] = useState('')
  const[code, setCode] = useState(null)
  const [jars, setJars] = useState([])

  useEffect(()=>{
    const jar1 = JSON.parse(localStorage.getItem("jar1"))
    const jar2 = JSON.parse(localStorage.getItem("jar2"))
    const jar3 = JSON.parse(localStorage.getItem("jar3"))
    const jar4 = JSON.parse(localStorage.getItem("jar4"))
    if (!jar1.name || !jar2.name || !jar3.name || !jar4.name){
      localStorage.setItem("jar1", JSON.stringify({id:1, name: "jar 1", deck:[{},{},{},{},{},{},{},{}]}))
      localStorage.setItem("jar2", JSON.stringify({id:2, name: "jar 2", deck:[{},{},{},{},{},{},{},{}]}))
      localStorage.setItem("jar3", JSON.stringify({id:3, name: "jar 3", deck:[{},{},{},{},{},{},{},{}]}))
      localStorage.setItem("jar4", JSON.stringify({id:4, name: "jar 4", deck:[{},{},{},{},{},{},{},{}]}))
    }
    setJars([jar1, jar2, jar3, jar4])
  },[jars.length === 0])

  useEffect(()=>{localStorage.setItem(`jar0`, '{}')},[])

  useEffect(()=>{
    if(page === ""){
      let element = document.getElementById("jar-select");
      element.value = (localStorage.getItem("jar0")[6] || '')
    }
  },[page])

  const selectedJar = e => {
    localStorage.setItem(`jar0`, localStorage.getItem(`jar${e.target.value}`))
  }
  
  if(page === ''){
    return (
      <div>
        <h1>Bug Jar Battles</h1>
        <SignOut/>
        <br/>
        <button onClick={() => setPage("jars")}>Jars</button>
        <br/>
        <br/>
        <label for="jar-select">Choose a jar to take into battle</label>
        <br/>
        <select onChange={e =>selectedJar(e)} name="jars" id="jar-select">
          <option value={''}>Random Bugs</option>
          {jars.map(j=>(
            <option value={j.id}>{j.name}</option>
          ))}
        </select>
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
      <Jars jars={jars} setPage={setPage} setJars={setJars}/>    )
  }
}

export default Home