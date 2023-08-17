const cleanUp = (jar, jug, area) => {
  const localJar = jar
  const localJug = jug
  const dialog = []

  const modBugs = [localJar[0],localJar[1],localJug[0],localJug[1]].map((b, i)=>{
    b.temp.wasInv = false
    if(b.temp?.inv){
     b.temp.inv = false
     b.temp.wasInv = true
    }
    if(b.temp?.nbl && b.health == 0) {
      var target = i % 2 === 0 ? i + 1 : i - 1
      var insect = [localJar[0],localJar[1],localJug[0],localJug[1]][target]
      dialog.push(`${target.name} nibbled on some remains`)
      insect.health = Math.min(insect.health + (insect.hp * 10 / 2), insect.hp * 10)
    }
    if(area == 'Ant Hill' && b.name.includes("ant") && b.health > 0){
      var newHealth = Math.max(0,b.health + Math.floor(b.hp * 10 / 16))
      dialog.push(`Due to the area, ${b.name} heals to ${newHealth}`)
      b.health = newHealth
    }
    if(b.temp?.ill && b.health > 0){
      var newHealth = Math.max(0,b.health - Math.floor((b.hp * 10) / 16))
      dialog.push(`${b.name} is ill, dropping its health to ${newHealth}`)
      b.health = newHealth
      if(newHealth == 0){dialog.push(`${b.name} scampered away from the fight`)}
    }
    return b
  })
  const swarm = localJar.filter(b=> b.health > 0 && b.moves.find(m=> m.name === "Swarm"))
  swarm.map(b=>{b.moves.map(m=>{ if(m.name === "Swarm"){ m.power = Math.min(swarm.length, 3)}})})

  localJar[0] = modBugs[0]
  localJar[1] = modBugs[1]
  localJug[0] = modBugs[2]
  localJug[1] = modBugs[3]
  return([dialog, localJar, localJug])
}
export default cleanUp