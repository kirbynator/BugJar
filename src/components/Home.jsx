import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'
import Jars from './Jars'
import { auth } from '../firebase'
import ant from '../media/ant.png'
import './style.css'


function Home() {
  const[page, setPage] = useState('start')
  const[code, setCode] = useState('')
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
    if(page === 'decks'){
      const hex = document.getElementsByClassName('hexagon')
      let i = 0
      while(i < hex.length){
        hex.item(i).style.transform = "rotate(90deg)"
        i++
      }
      const decks = document.getElementsByClassName('deck')
      i = 0
      while(i < decks.length){
        decks.item(i).style.transform = "rotate(-90deg)"
        i++
      }
    } else {
      const hex = document.getElementsByClassName('hexagon')
      let i = 0
      while(i < hex.length){
        hex.item(i).style.transform = "rotate(0deg)"
        i++
      }
    }
  },[page])

  const selectedJar = e => {
    localStorage.setItem(`jar0`, localStorage.getItem(`jar${e}`))
    setPage("")
  }

  const typeCode = e => {
    const lol = document.getElementById("input1").value + document.getElementById("input2").value + document.getElementById("input3").value + document.getElementById("input4").value
    setCode(lol)
    if(e.target.id !== "input4"){ document.getElementById(`input${1 + parseInt(e.target.id[5])}`).focus() }
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
            <img style={{filter: "grayscale(1)"}} src={player.photoURL} alt="" />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent:"center", height:'100%', alignItems:'center', flexDirection:"column"}}>
          <div style={{display: 'flex', justifyContent:"center", width: '100%', marginBottom: '-10%'}}>
            <div class='hexagon' onClick={() => setPage('decks')}>
              <div style={{flexDirection:"column", transform: "rotate(0deg)"}}>
                <div style={{color: "white", fontSize: "3vw", textDecoration: "underline"}}>
                  {JSON.parse(localStorage.getItem("jar0"))?.name || "Random Bugs"}
                </div>
                <div style={{color: "white", fontSize: "1vw", margin:'2%'}} onClick={() => setPage('decks')}>
                  Select Jar
                </div>
                
              </div>
            </div>
            <div style={{width: '20%'}}/>
            <div style={{justifyContent:"center"}}class='hexagon'>
              <div style={{heightMin:"30em", transform: "rotate(0deg)"}}>
               <div style={{fontSize: "3vw", cursor:'default'}}>Battle Code</div>
                <div style={{width: "10%"}}></div>
                <div style={{display: 'flex', justifyContent:"space-around", width: '100%', marginTop:"2%", marginBottom:"10%"}}>
                  <div style={{width: "20%"}}></div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input1' class="input" value={code[0]} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input2' class="input" value={code[1]} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/> 
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input3' class="input" value={code[2]} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input4' class="input" value={code[3]} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}></div>
                </div>
              </div>
            </div>
          </div>
          <div class="hexagon">
            <div style={{fontSize: "4vw",  zIndex:2, cursor:'default', position: "relative", transform: "rotate(0deg)"}} onClick={() => setPage("wait")}>  
              <>{code ? "Join" : "Create"}</>
              <div>Battle</div>
            </div>
          </div>
        <div style={{display: 'flex', justifyContent:"center", width: '100%', marginTop: '-10%'}} >
            <div class='hexagon' onClick={() => setPage("jars")}>
              <div style={{color: "white", fontSize: "3vw", transform: "rotate(0deg)"}}>
                Edit Jars
              </div>
            </div>
            <div style={{width: '20%', fontSize: "3vw"}}/>
            <div class='hexagon'>Made by Zach Kirby</div>
          </div>
        </div>
      </div>
    )
  }else if(page=== 'decks'){
    return (
      <div style={{width: '100%', height:'100%'}}>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
          <h1>Bug Jar Battles</h1>
          <div style={{display:'flex', justifyContent:'flex-start'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'space-around', justifyContent:'space-around', padding:'3px', textAlign:'right'}}>
            <div style={{padding: "3%"}}>{player.displayName}</div>
            <SignOut/>
            </div>
            <img style={{filter: "grayscale(1)"}} src={player.photoURL} alt="" />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent:"center", height:'100%', alignItems:'center', flexDirection:"column"}}>
          <div style={{display: 'flex', justifyContent:"center", width: '100%', marginBottom: '-10%'}}>
            <div class='hexagon' onClick={() =>selectedJar(1)}>
              <div class="deck" style={{wordWrap:'normal', margin:"1e,", color: "white", fontSize: "3vw", textDecoration: "underline"}}>{jars[0].name}</div>
            </div>
            <div style={{width: '20%'}}/>
            <div style={{justifyContent:"center"}} class='hexagon' onClick={() =>selectedJar(2)}>
              <div class="deck" style={{wordWrap:'normal', margin:"1em", color: "white", fontSize: "3vw", textDecoration: "underline"}}>{jars[1].name}</div>
            </div>
          </div>
          <div class="hexagon" onClick={() =>selectedJar('')}>
            <div class="deck" style={{wordWrap:'normal', margin:"1em", color: "white", fontSize: "3vw", textDecoration: "underline"}}>Random Bugs</div>
          </div>
        <div style={{display: 'flex', justifyContent:"center", width: '100%', marginTop: '-10%'}}>
            <div class='hexagon' onClick={() =>selectedJar(3)}>
              <div class="deck" style={{wordWrap:'normal', margin:"1em", color: "white", fontSize: "3vw", textDecoration: "underline"}}>{jars[2].name}</div>
            </div>
            <div style={{width: '20%'}}/>
            <div class='hexagon' onClick={() =>selectedJar(4)}>
              <div class="deck" style={{wordWrap:'normal', margin:"1em", color: "white", fontSize: "3vw", textDecoration: "underline"}}>{jars[3].name}</div>
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