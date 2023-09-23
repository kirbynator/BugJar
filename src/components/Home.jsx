import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Battle from './Battle'
import Jars from './Jars'
import { auth, db } from '../firebase'
import {
  query,
  collectionGroup,
  getDocs
} from "firebase/firestore";
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

  const selectedJar = e => {
    localStorage.setItem(`jar0`, localStorage.getItem(`jar${e}`))
    setPage("")
  }

  const getRNG = async () => {
    setCode('loading')
    const snapshot = await getDocs(query(collectionGroup(db, "players")))
    const codes = snapshot.docs.map(doc => {
      return doc.ref._key.path.segments[6]
    })
    let code = Math.floor(Math.random()*10000)
    while(codes.indexOf(`${code}`) > -1){
      code === 9999 ? code = 0 : code += 1
    }
    setCode(code)
    setPage("wait")
  }

  const typeCode = e => {
    if(e?.nativeEvent && e.type === 'keydown' && e.keyCode === 8 && e.target.value === ""){return document.getElementById(`input${parseInt(e.target.id[5]) - 1}`).focus()}
    if(e?.nativeEvent && (e.type === 'click' || e.type === 'keydown')){
      e.stopPropagation()
      if(e.type === 'click'){return document.getElementById(`input${1 + code.length}`).focus()}
    }
    const lol = document.getElementById("input1").value + document.getElementById("input2").value + document.getElementById("input3").value + document.getElementById("input4").value
    setCode(lol)
    if(e.target.id !== "input4" && e.target.value !== "" ){ document.getElementById(`input${1 + parseInt(e.target.id[5])}`).focus() }
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
            <div class='laying hexagon' onClick={() => setPage('decks')}>
              <div style={{flexDirection:"column", justifyContent:'center', alignItems:'center', transform: "rotate(0deg)"}}>
                <div style={{fontSize: "3vw"}}>Selected Jar</div>
                <div style={{fontWeight: 'bold', maxWidth:'7.5em', marginTop:"2%", marginBottom:"10%", textAlign: 'center', paddingLeft: "1em", paddingRight: "1em", fontSize: "2vw", borderRadius: ".75em", border: "none", outline: "none", backgroundColor: "#212121", boxShadow: "inset 2px 2px 5px #000000, inset -2px -2px 5px #676767"}}>
                  {JSON.parse(localStorage.getItem("jar0"))?.name || "Empty Jar"}
                </div>
              </div>
            </div>
            <div style={{width: '20%'}}/>
            <div style={{justifyContent:"center"}} class='laying hexagon' onClick={()=>typeCode({target:{id: `01234${code.length}`}})}>
            {code !== 'loading' && <div style={{heightMin:"30em", transform: "rotate(0deg)"}}>
                <div style={{fontSize: "3vw"}}>Battle Code</div>
                <div style={{width: "10%"}}></div>
                <div style={{display: 'flex', justifyContent:"space-around", width: '100%', marginTop:"2%", marginBottom:"10%"}}>
                  <div style={{width: "20%", pointerEvents:'none'}}></div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input1' class="input" value={code[0]} onClick={(e)=>typeCode(e)} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input2' class="input" value={code[1]} onKeyDown={(e)=>typeCode(e)} onClick={(e)=>typeCode(e)} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/> 
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input3' class="input" value={code[2]} onKeyDown={(e)=>typeCode(e)} onClick={(e)=>typeCode(e)} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}>
                    <input maxlength="1" id='input4' class="input" value={code[3]} onKeyDown={(e)=>typeCode(e)} onClick={(e)=>typeCode(e)} onChange={e =>typeCode(e)} onPaste={e => setCode(e.clipboardData.getData('Text'))}/>
                  </div>
                  <div style={{width: "20%"}}></div>
                </div>
              </div>}
            </div>
          </div>
          <div class="laying hexagon" onClick={() => {if(code !== 'loading'){code ? setPage("wait") : getRNG()}}}>
            <div style={{fontSize: "4vw",  zIndex:2, cursor:'default', position: "relative", transform: "rotate(0deg)"}}>  
              <>{code && code !== 'loading' ? "Join" : "Create"}</>
              <div>Battle</div>
            </div>
          </div>
        <div style={{display: 'flex', justifyContent:"center", width: '100%', marginTop: '-10%'}} >
            <div class='laying hexagon' onClick={() => code !== 'loading' && setPage("jars")}>
              <div style={{fontSize: "3vw", transform: "rotate(0deg)"}}>
                Edit Jars
              </div>
            </div>
            <div style={{width: '20%', fontSize: "3vw"}}/>
            <div class='laying hexagon' onClick={() => window.open("https://github.com/kirbynator/BugJar/blob/main/src/components/bugs.js", "_blank")}>Made by Zach Kirby</div>
          </div>
        </div>
      </div>
    )
  }else if(page === 'decks'){
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
            <div class='upright hexagon' onClick={() =>selectedJar(1)}>
              <div class="deck" style={{transform: "rotate(-90deg)", wordWrap:'normal', margin:"1.8em", fontSize: "3vw"}}>{jars[0].name}</div>
            </div>
            <div style={{width: '20%'}}/>
            <div class='upright hexagon' onClick={() =>selectedJar(2)}>
              <div class="deck" style={{transform: "rotate(-90deg)", wordWrap:'normal', margin:"1.8em", fontSize: "3vw"}}>{jars[1].name}</div>
            </div>
          </div>
          <div class="upright hexagon" onClick={() =>selectedJar('')}>
            <div class="deck" style={{transform: "rotate(-90deg)", wordWrap:'normal', margin:"1.8em", fontSize: "3vw"}}>Empty Jar</div>
          </div>
        <div style={{display: 'flex', justifyContent:"center", width: '100%', marginTop: '-10%'}}>
            <div class='upright hexagon' onClick={() =>selectedJar(3)}>
              <div class="deck" style={{transform: "rotate(-90deg)", wordWrap:'normal', margin:"1.8em", fontSize: "3vw"}}>{jars[2].name}</div>
            </div>
            <div style={{width: '20%'}}/>
            <div class='upright hexagon' onClick={() =>selectedJar(4)}>
              <div class="deck" style={{transform: "rotate(-90deg)", wordWrap:'normal', margin:"1.8em", fontSize: "3vw"}}>{jars[3].name}</div>
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