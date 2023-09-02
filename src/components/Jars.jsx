import React, {useState} from 'react'
import JarBuilder from './JarBuilder'

const Jars = props => {
  const [selectedJar, setSelectedJar] = useState(JSON.parse(localStorage.getItem("jar0")))

  const saveJar = jar => {
    localStorage.setItem(`jar${jar.id}`, JSON.stringify(jar))
    props.setJars([])
    setSelectedJar({})
  }

  const renderJar = () => {
    return (<JarBuilder jar={selectedJar} save={saveJar} cancel={setSelectedJar}/>)
  }

  return(
    <div key={selectedJar?.name} style={{width:"100%", height:"100%"}}>
      <div style={{width:"100%", height:"30%", display: "flex", justifyContent:"space-around", flexWrap: 'wrap'}}>
        {props.jars.map(jar=>{
          return(<div key={jar.id} style={{width:"20%", height:"20%", textAlign:'center', border: 'solid', minHeight: '7em', borderRadius: "0 0 25% 25%"}} onClick={()=>setSelectedJar(jar)}>
            <div style={{backgroundColor:"black", color: "white"}}>{jar.name}</div>
            <div>
            {jar.deck.map((t,i)=>(<>{` ${t.name && i === 7 ? 'and ' : ''}${t?.name || ''}${t.name && i < 7 ? ',' : ''} `}</>))}
            </div>
          </div>)
        }) }
      </div>
      {selectedJar?.name ? renderJar() : <button style={{width:'90%', margin: '5%'}} onClick={()=>props.setPage('')}>Return Home</button>}
    </div>
  )

}

export default Jars
