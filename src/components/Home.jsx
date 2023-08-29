import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'
import Jars from './Jars'
import { auth } from '../firebase'
import ant from '../media/ant.png'


function Home() {
  const[page, setPage] = useState('start')
  const[code, setCode] = useState(null)
  const [jars, setJars] = useState([])
  const [player, setPlayers] = useState(auth.currentUser)

  useEffect(()=>{
    if(!jars[0]){
      const jar1 = JSON.parse(localStorage.getItem("jar1"))
      const jar2 = JSON.parse(localStorage.getItem("jar2"))
      const jar3 = JSON.parse(localStorage.getItem("jar3"))
      const jar4 = JSON.parse(localStorage.getItem("jar4"))
      if (!jar1?.name || !jar2?.name || !jar3?.name || !jar4?.name){
        localStorage.setItem("jar1", JSON.stringify({id:1, name: "jar 1", deck:[{},{},{},{},{},{},{},{}]}))
        localStorage.setItem("jar2", JSON.stringify({id:2, name: "jar 2", deck:[{},{},{},{},{},{},{},{}]}))
        localStorage.setItem("jar3", JSON.stringify({id:3, name: "jar 3", deck:[{},{},{},{},{},{},{},{}]}))
        localStorage.setItem("jar4", JSON.stringify({id:4, name: "jar 4", deck:[{},{},{},{},{},{},{},{}]}))
      }
      setJars([jar1, jar2, jar3, jar4])
    }
  },[jars])

  useEffect(()=>{if(page === 'start'){
    localStorage.setItem(`jar0`, '{}')
    setPage('')
  }},[])

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
      <div style={{width: '100%', height:'100%'}}>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
          <h1>Bug Jar Battles</h1>
          <div style={{display:'flex', justifyContent:'flex-start'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'space-around', justifyContent:'space-around', padding:'3px', textAlign:'right'}}>
            <div style={{padding: "3%"}}>{player.displayName}</div>
            <SignOut/>
            </div>
            <img src={player.photoURL} alt="" />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent:"center", height:'100%', alignItems:'center'}}>
          <div style={{width: "50%", height:"100%"}}>
            <div style={{width: "100%", height:"50px", borderBottom: 'solid', display:'flex', alignItems:'center', justifyContent:'center', }}>
              <select style={{zIndex:1}} onChange={e =>selectedJar(e)} name="jars" id="jar-select">
                <option value={''}>Random Bugs</option>
                {jars.length > 0 && jars.map(j=>(
                  <option value={j?.id}>{j?.name}</option>
                ))}
              </select>
            </div>
            <div style={{width: "100%", height:"50px", borderTop: 'solid', display:'flex', alignItems:'center', justifyContent:'center',}}>
              <button style={{zIndex:1}} onClick={() => setPage("jars")}>Jars</button>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', marginTop:'37px'}}>
            <div style={{color: "black", fontSize: "1000%", marginLeft:"-.23em", transform: 'rotate(-90deg)', cursor:'default'}}>⬢</div>
            <div onClick={() => setPage("wait")} style={{color:'white', position:'relative', top: "-8em", paddingRight:'1em', zIndex:2, cursor:'default', textAlign: 'center'}}>
              <>{code ? "Join" : "Create"}</>
              <div>Battle</div>
            </div>
          </div>
          <div style={{width: "50%", height:"100%"}}>
            <div style={{width: "100%", height:"50px", borderBottom: 'solid', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <img style={{height: '102%'}} src={ant}></img>
            </div> 
            <div style={{width: "100%", height:"50px", borderTop: 'solid', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <form style={{zIndex:1}} onSubmit={() => setPage("wait")}><input type="integer" placeholder="Battle code..." value={code} onChange={e=>setCode(e.target.value)}/></form>
            </div>
          </div>
          
        </div>

      </div>
    )
  } else if(page==='wait'){
    return(<Battle setPage={setPage} page={page} setCode={setCode} code={code}/>)
  } else if(page==='jars'){
    return(<Jars jars={jars} setPage={setPage} setJars={setJars}/>)
  }
}

export default Home