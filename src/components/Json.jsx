import React from 'react'

const Json = ({data, button, buttonFuction}) => {
  const keys = Object.keys(data[0]) 
  return(<div style={{width: '100%', heigth: '100%', padding:"5px"}}>
    <div style={{width: '100%', display: 'flex', justifyContent:'center'}}>
    {keys.map((k,i)=>(
      <div style={{display: 'flex', flexDirection:'column'}}>
        <div style={{border: '0.1rem solid', height: "25px"}}>{k.toUpperCase()}</div>
        {data.map(d=>(
          <div style={{border: '0.1rem solid', background:"silver", height: "25px"}}>{d[k]}</div>
        ))}
      </div>
    ))}
     {button && <div style={{display: 'flex', flexDirection:'column'}}>
     <div style={{border: '0.1rem solid', background:"white", height: "25px"}}/>
     {data.map(d=>(
          <div style={{border: '0.1rem solid', background:"silver", height: "25px"}}><button style={{height: "25px"}} onClick={() => buttonFuction(d)}>{button}</button></div>
        ))}
        </div>}
    </div>
  </div>)

}

export default Json
