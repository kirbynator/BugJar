import React, {useEffect, useState} from 'react'
import JarBuilder from './JarBuilder'

const Jars = props => {
  const [jars, setJars] = useState([])
  const [selectedJar, setSelectedJar] = useState(JSON.parse(localStorage.getItem("jar0")))

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

  const saveJar = jar => {
    localStorage.setItem(`jar${jar.id}`, JSON.stringify(jar))
    setJars([])
    setSelectedJar({})
  }

  const renderJar = () => {
    return (<JarBuilder jar={selectedJar} save={saveJar} cancel={setSelectedJar}/>)
  }

  return(
    <div key={selectedJar?.name} style={{width:"100%", height:"100%"}}>
      <div style={{width:"100%", height:"30%", display: "flex", justifyContent:"space-around"}}>
        {jars.map(jar=>{
          return(<div key={jar.id} style={{width:"20%", height:"20%", backgroundColor:"black", color: "white", textAlign:'center'}} onClick={()=>{setSelectedJar(jar)}}>
            <div>{jar.name}</div>
          </div>)
        }) }
      </div>
      {selectedJar?.name ? renderJar() : <button style={{width:'60%', margin: '20%'}} onClick={()=>props.setPage('')}>Return Home</button>}
    </div>
  )

}

export default Jars
