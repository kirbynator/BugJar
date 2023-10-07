const attackLogic = (attacks, jar, jug, area, rival) => {
  let localJar = jar
  let localJug = jug
  let localArea = area
  let dialog = []
  localJar.map(b=>{
    b.temp.hurt = false
    b.temp.agro = false
    b.temp.shake = false
    b.temp.protect = false
  })
  localJug.map(b=>{
    b.temp.hurt = false
    b.temp.agro = false
    b.temp.shake = false
    b.temp.protect = false
  })
  attacks.map(attack => {
    if(attack.move.name === "surrender"){
      if (attack.move.user === rival){
        localJar.map(b=>{
          b.health = 0;
          b.name = null
        })
        dialog.push(`You smushed all your bugs`)
      } else {
        localJug.map(b=>{
          b.health = 0;
          b.name = null
        })
        dialog.push(`Your opponent smushed all their bugs`)
      }
    }
    let bug = localJar.concat(localJug).find(i => i.id === attack.bug.id)
    if(bug?.health > 0 || attack.dead){
      if(attack.move.name === "switch"){
        bug.temp = {}
        const insect = {...bug}
        if (insect.user === rival){
          const lead = localJug[(attack.move.target)]
          localJug[localJug.findIndex(b=> b.id === insect.id)] = lead
          localJug[(attack.move.target)] = insect
          dialog = dialog.concat(insect.name ? [`${insect.name} switches out for ${lead.name}`] : [`${lead.name} was sent out!`])
        } else {
          const lead = localJar[(attack.move.target)]
          localJar[localJar.findIndex(b=> b.id === insect.id)] = lead
          localJar[attack.move.target] = insect
          dialog = dialog.concat(insect.name ? [`${insect.name} switches out for ${lead.name}`] : [`${lead.name} was sent out!`])
        }
      } else {
        const outcome = attackEffect(attack.move, bug, getTarget(attack, localJar, localJug, rival), localArea)
        if(outcome[0]){dialog = dialog.concat(outcome[0])}
        if(outcome[1]){outcome[1].user === rival ? localJug[localJug.findIndex(b=> b.id === outcome[1].id)] = outcome[1] : localJar[localJar.findIndex(b=> b.id === outcome[1].id)] = outcome[1] }
        if(outcome[2]){outcome[2].user === rival ? localJug[localJug.findIndex(b=> b.id === outcome[2].id)] = outcome[2] : localJar[localJar.findIndex(b=> b.id === outcome[2].id)] = outcome[2] }
        if(outcome[4]){localArea = outcome[4]}
      }
    }
  })

  return([dialog, localJar, localJug, localArea])
}

const getTarget = (attack, jar, jug, rival) => {
  if (!attack.target){return}
  var target = null
  if (attack.target > 0){
    target = attack.bug.user === rival ? jar[Math.abs(attack.target) - 1] : jug[Math.abs(attack.target) - 1]
  }else{
    target = attack.bug.user === rival ? jug[Math.abs(attack.target) - 1] : jar[Math.abs(attack.target) - 1]
  }
  if(target.health === 0){ 
    if (attack.target > 0){
      attack.target = Math.abs(attack.target - 3) 
      target = attack.bug.user === rival ? jar[Math.abs(attack.target) - 1] : jug[Math.abs(attack.target) - 1]
    }else{
      return null
    }
  }
  return target
}

const attackEffect = (move, bug, target, localArea) => {
  console.log(`${bug.name} uses ${move.name} on ${target?.name}`)
  switch(move.name){
    case "Bug Bash":
    case "Mandible Maul":
    case "Apex Assault":
    case "Floral Feint":
    case "Flutter Fury":
    case "Twitch":
    case "Swarm":
    case "Domain Drop":
    case "Saltatorial Stomps":
    case "Pharaoh's Blight":
      return damageCal(move, bug, target)
    break;
    case "Shell Shield":
      bug.temp.protect = true
      if(bug.temp?.wasInv) {
        bug.temp.inv = move.random > 0.93
        return([bug.temp.inv ? [`${bug.name} used Shell Shield to try to protect itself, and was successful!`] : [`${bug.name} used Shell Shield to try to protect themself, and failed`], bug])
      } else {
        bug.temp.inv = true
        return([[`${bug.name} used Shell Shield to protect themself`], bug])
      }
    break;
    case "Prevention Trap":
      bug.temp.shake = true
      if(!target){return damageCal(move, bug, target)}
      target.temp.protect = true
      if(target.temp?.wasInv) {
        target.temp.inv = move.random > 0.93
        return([target.temp.inv ? [`${bug.name} used Prevention Trap to try to protect ${target.name}, and was successful`] : [`${bug.name} used Prevention Trap to try to protect ${target.name}, and failed`], bug, target])
      } else {
        target.temp.inv = true
        return([[`${bug.name} used Prevention Trap to try to protect ${target.name}`], bug, target])
      }
    break;
    case "Toxic Tincture":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      if (!enemy.temp?.ill && calc[3]){
        enemy.temp.ill = true
        convo.push(`${enemy.name} became ill`)
      }
      return([convo, insect, enemy])
    break;
    case "Royal Decree":
      bug.temp.shake = true
      return([[`${bug.name} used Royal Decree`, `${bug.name} created an ant hill arena`], bug, null, true, 'an ant hill'])
    break;
    case "Crystalize":
      bug.temp.shake = true
      var insect = {...bug}
      insect.name = "Chrysalis"
      insect.atk = 1
      insect.def = 10
      insect.spd = 3
      insect.moves[0] = {name: "Metamorphose", power: 0,  pryo:0, info: "Emerge into the adult form of this bug"}
      insect.moves[1] = {name: "Shell Shield", power: 0,  pryo:2, info: "Before attacks, this bug tries to protect itself"}
      return([[`${bug.name} used Crystalize, and becomes a Chrysalis!`], insect])
    break;
    case "Metamorphose":
      bug.temp.shake = true
      var insect = {...bug}
      insect.moves[0] = {name: "Flutter Fury", power: 3, pryo: 0, info: "This bugs stikes with a fast series of blows"}
      insect.moves[1] = {name: "Butterfly Kiss", power: 0, pryo: 0, info: "Heals this bug and ally bug"}
      if (insect.form === 1){
        insect.name = "Skipper Butterfly"
        insect.atk = 5
        insect.def = 5
        insect.spd = 10
      } else if (insect.form === 2){
        insect.name = "Birdwing Butterfly"
        insect.atk = 5
        insect.def = 10
        insect.spd = 5
      } else if (insect.form === 4){
        insect.name = "Caddisfly"
        insect.atk = 4
        insect.def = 8
        insect.spd = 5
        insect.moves[0] = {name: "Domain Drop", power: 2,  pryo:0,  info:"If the arena is a pond, this attack takes priority"}
        insect.moves[1] = {name:"Nibble", power: 1, pryo:0, info: "Will raise ally bug's stats when this bug runs out of hp"}
      } else if (insect.form === 5){
        insect.name = "Lacewing"
        insect.atk = 9
        insect.def = 2
        insect.spd = 9
        insect.moves[1] = {name: "Floral Feint", power: 2, pryo: 0, info: "This attack can't be blocked",}
      } else {
        insect.name = "Monarch Butterfly"
        insect.atk = 10
        insect.def = 5
        insect.spd = 5
      }
      return([[`${bug.name} used Metamorphose, emerging as a ${insect.name}!`], insect])
    break;
    case "Luminous Burst":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      if (calc[3]){
      convo.push("The arena is glowing")
      return([convo, insect, enemy, true, "glowing"])
      }else{
        return([convo, insect, enemy])
      }
    break;
    case "Skitter":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      if (calc[3]){
        convo.push(`${bug.name} clears the arena`)
        return([convo, insect, enemy, true, ""])
      }else{
        return([convo, insect, enemy])
      }
    break;
    case "Carapace Castle":
      bug.temp.shake = true
      var convo = [`${bug.name} used Carapace Castle`]
      if((bug.temp?.def || 0) < 7) {
        bug.temp.def = (bug.temp?.def || 0) + 1
        convo.push(`${bug.name}'s defense rose`)
      } else {convo.push(`${bug.name}'s defense can't rise anymore`)}
      if(target && ((target.temp?.def || 0) < 7)) {
        target.temp.shake = true
        target.temp.def = (target.temp?.def || 0) + 1
        convo.push(`${target.name}'s defense rose`)
      } else if(target){convo.push(`${target.name}'s defense can't rise anymore`)}
      return([convo, bug, target])
    break;
    case "Cutting Edge":
      bug.temp.shake = true
      var convo = [`${bug.name} used Cutting Edge`]
      if((bug.temp?.atk || 0) < 7) {
        bug.temp.atk = (bug.temp?.atk || 0) + 1
        convo.push(`${bug.name}'s attack rose`)
      } else {convo.push(`${bug.name}'s attack can't rise anymore`)}
      if(target && ((target.temp?.atk || 0) < 7)) {
        target.temp.shake = true
        target.temp.atk = (target.temp?.atk || 0) + 1
        convo.push(`${target.name}'s attack rose`)
      } else if(target){convo.push(`${target.name}'s attack can't rise anymore`)}
      return([convo, bug, target])
    break;
    case "Chirp":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      if (calc[3] && enemy.health > 0){
        enemy.temp = {}
        enemy.temp.hurt = true
        convo.push(`${enemy.name} was so surprised by the sudden sound it reset them`)
      }
      return([convo, insect, enemy])
    break;
    case "Infrared Impact":
      var calc = damageCal(move, bug, target)
      var convo = calc[0];
      var insect = calc[1];
      var enemy = calc[2];
      if (calc[3] && localArea === "glowing"){
        convo.push(`${insect.name} stats' were rised!`);
        (insect.temp?.atk || 0) < 7 ? insect.temp.atk = (insect.temp?.atk || 0) + 1 : convo.push(`${insect.name}'s attack can't rise anymore`)
        (insect.temp?.def || 0) < 7 ? insect.temp.def = (insect.temp?.def || 0) + 1 : convo.push(`${insect.name}'s defense can't rise anymore`)
        (insect.temp?.spd|| 0) < 7 ? insect.temp.spd = (insect.temp?.spd|| 0) + 1 : convo.push(`${insect.name}'s speed can't rise anymore`)
      }
      return([convo, insect, enemy])
    break;
    case "Lethal Lunge":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      var successful = false
      if (calc[3] && enemy.health > 0){
        (enemy.temp?.def || 0) > -7 ? successful = true : convo.push(`${enemy.name}'s defense can't go lower`)
        if(successful){
          convo.push(`${enemy.name} defense was lowered`)
          enemy.temp.def = (enemy.temp?.def || 0) - 1
        }
      }
      return([convo, insect, enemy])
    break;
    case "Shell Smash":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      var successful = false
      if (calc[3] && enemy.health > 0){
        (enemy.temp?.atk || 0) > -7 ? successful = true : convo.push(`${enemy.name}'s attack can't go lower`)
        if(successful){
          convo.push(`${enemy.name} attack was lowered`) 
          enemy.temp.atk = (enemy.temp?.atk || 0) - 1
        }
      }
      return([convo, insect, enemy])
    break;
    case "Outbreak":
      var calc = damageCal(move, bug, target);
      var convo = calc[0];
      var insect = calc[1];
      var enemy = calc[2];
      if (calc[3]){
        convo.push(`${insect.name} is getting rowdy`);
        insect.temp.ob = true;
        (insect.temp?.spd || 0) > -7 ? successful = true : convo.push(`${insect.name}'s speed can't go lower`);
        if(successful){
          convo.push(`${insect.name} speed was lowered`);
          insect.temp.spd = (insect.temp?.spd || 0) - 1;
        };
      };
      return([convo, insect, enemy])
    break
    case "Sting":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      if (!insect.temp?.ill && calc[3]){
        insect.temp.ill = true
        convo.push(`${insect.name} became ill`)
      }
      return([convo, insect, enemy])
    break
    case "Swift Strike":
      move.power = bug.spd * tempStatMulti(bug.temp?.spd) > target.spd * tempStatMulti(target.temp?.spd) ? 4 : 2
      console.log(`Swift Strikes power is ${move.power}`)
      return damageCal(move, bug, target)
    break
    case "Vibes":
      bug.temp.shake = true
      var insect = {...bug};
      var convo = [`${insect?.name} vibes`];
      var successful = false;
      (insect.temp?.def || 0) < 7 ? successful = true : convo.push(`${insect.name}'s defence can't rise anymore`);
      if(successful){
        convo.push(`${bug.name}'s defense rose`) ;
        insect.temp.spd = (insect.temp?.def || 0) + 1;
      }
      (insect.temp?.spd || 0) < 7 ? successful = true : convo.push(`${insect.name}'s speed can't rise anymore`);
      if(successful){
        convo.push(`${bug.name}'s speed rose`) ;
        insect.temp.spd = (insect.temp?.spd || 0) + 1;
      }
      return([convo, insect]);
    break
    case "Nibble":
      bug.temp.nbl = true
      return damageCal(move, bug, target)
    break
    case "Persistent":
      bug.temp.shake = true
      if(insect.health === insect.hp * 10){return([[`${bug.name} used Persistent, but it failed`], bug])}
      var insect = bug
      var convo = [`${bug.name} used Persistent, healing itself!`]
      var moves = insect.moves
      insect.health = insect.hp * 10
      moves.splice(moves.findIndex(m => m.name === 'Persistent'), 1)
      insect.moves = moves
      return([convo, insect])
    break;
    case "Butterfly Kiss":
      bug.temp.shake = true
      var convo = [`${bug.name} used Butterfly Kiss`]
      bug.health = Math.min(bug.hp * 10, bug.health + Math.floor(bug.hp * 10 / 8))
      convo.push(`${bug.name} was healed`)  
      if(target && target.health > 0){
        target.temp.shake = true
        target.health = Math.min(target.hp * 10, target.health + Math.floor(target.hp * 10 / 8))
        convo.push(`${target.name} was healed`)  
      }
      return([convo, bug, target])
    break;
    case "Water Ponder":
      bug.temp.shake = true
      var insect = {...bug};
      var convo = [`${insect?.name} uses Water Ponder`];
      var successful = false;
      (insect.temp?.atk || 0) < 7 ? successful = true : convo.push(`${insect.name}'s attack can't rise anymore`);
      if(successful){
        convo.push(`${bug.name}'s attack rose`);
        insect.temp.atk = (insect.temp?.atk || 0) + 1;
        convo.push("The arena is now a pond!")
      }
      return([convo, insect, null, true, "a pond"]);
    break
    case "Visceral Violate":
      var calc = damageCal(move, bug, target)
      var convo = calc[0]
      var insect = calc[1]
      var enemy = calc[2]
      var successful = false
      if (calc[3]){
        (insect.temp?.atk || 0) < 7 ? successful = true : convo.push(`${insect.name}'s attack can't rise anymore`)
        if(successful){
          convo.push(`${bug.name}'s attack rose`);
          insect.temp.atk = (insect.temp?.atk || 0) + 1;
        }
      }
      return([convo, insect, enemy])
    break;
  }
}

const damageCal = (move, bug, target) => {
  if(!target || target.health === 0){return([`${bug.name} used ${move.name} but it failed`, bug, target, false])}
  if (target.temp?.inv && move.name !== "Floral Feint"){
    return([[`${bug.name} used ${move.name} on ${target.name}, but ${target.name} was protected`], bug, target, false])
  } else {
    const totalAtk = bug.atk * 10 * tempStatMulti(bug.temp?.atk)
    const totalDef = target.def * 10 * tempStatMulti(target.temp?.def)
    const damage = Math.floor((Math.floor(Math.floor(Math.floor(2 * 20 / 5 + 2) * (move.power * 40) * totalAtk / totalDef) / 50) + 2) * (move?.random || 1))
    target.health = Math.max(target.health - damage, 0)
    target.temp.hurt = true
    bug.temp.agro = true
    const message = [`${bug.name} used ${move.name} on ${target.name} dealing ${damage} damage!`]
    if (target.health === 0 && target.inft !== 1 && !target.temp?.nbl){message.push(`${target.name} scampered away from the fight`)}
    return([message, bug, target, true])
  }
}

const tempStatMulti = (i) => {
  if(!i){return (1)}
  return (i > 0 ? ((2 + i) / 2) : (2 / (2 - i)))
}

export default attackLogic