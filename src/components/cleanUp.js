const cleanUp = (jar, jug, area, rival) => {
  var localJar = jar
  var localJug = jug
  const dialog = []

  const modBugs = [localJar[0],localJar[1],localJug[0],localJug[1]].map((b, i)=>{
    if (b.health === 0) {
      if(b.inft == 1){
        dialog.push(`${b.name} was infected with a parasitic fungus`)
        b.name = "Zombie " + b.name
        b.hp = 0.1
        b.health = 1
        b.inft = 0
        b.temp.ill = false
      } else {
        b.name = null
      }
    }
    b.temp.wasInv = false
    if(b.temp?.inv){
     b.temp.inv = false
     b.temp.wasInv = true
    }
    if(b.temp?.nbl && b.health == 0) {
      var target = i % 2 === 0 ? i + 1 : i - 1
      var insect = [localJar[0],localJar[1],localJug[0],localJug[1]][target]
      if (insect.health > 0){
        dialog.push(`${insect.name} nibbled on some remains`)
        dialog.push(`${insect.name} stats were rised!`)
        (insect.temp?.atk || 0) < 7 ? insect.temp.atk  = (insect.temp?.atk || 0) + 1 : dialog.push(`${insect.name}'s attack can't rise anymore`)
        (insect.temp?.def || 0) < 7 ? insect.temp.def  = (insect.temp?.def || 0) + 1 : dialog.push(`${insect.name}'s defense can't rise anymore`)
        (insect.temp?.spd|| 0) < 7 ? insect.temp.spd = (insect.temp?.spd|| 0) + 1 : dialog.push(`${insect.name}'s speed can't rise anymore`)
      }
    }
    if(area == 'an ant hill' && b.health > 0 && b.name.search("Ant") > -1){
      var newHealth = Math.min(b.hp * 10, b.health + Math.floor(b.hp * 10 / 16))
      dialog.push(`Due to the arena, ${b.name} heals to ${newHealth}`)
      b.health = newHealth
    }
    if(b.temp?.ill && b.health > 0){
      var newHealth = Math.max(0,b.health - Math.floor((b.hp * 10) / 16))
      dialog.push(`${b.name} is ill, dropping its health to ${newHealth}`)
      b.health = newHealth
      if(newHealth == 0){dialog.push(`${b.name} scampered away from the fight`)}
    }
    if(b.temp.ob && b.health > 0){
      b.temp.ob = false
      dialog.push(`${b.name} caused an outbreak!`)
      if (b.user === rival){
        localJug = localJug.map(d=>{
          if(d.health > 0 && d.moves.length < 4 && !d.moves.find(m=>m.name === "Swarm")){
            d.moves.push({name: "Swarm", power: 1, pryo:0, info: "Becomes stronger the more bugs in your jar that know it"})
            dialog.push(`${d.name} can now use Swarm!`)
            return d
          } else {return d}
        })
      } else {
        localJar = localJar.map(d=>{
          if(d.health > 0 && d.moves.length < 4 && !d.moves.find(m=>m.name === "Swarm")){
            d.moves.push({name: "Swarm", power: 1, pryo:0, info: "Becomes stronger the more bugs in your jar that know it"})
            dialog.push(`${d.name} can now use Swarm!`)
            return d
          } else {return d}
        })
      }
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