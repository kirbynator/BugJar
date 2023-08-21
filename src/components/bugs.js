const bugs = [
  {name: 'Caterpillar', rarity: 1, hp: 5, atk: 3, def: 5, spd: 5, moves:[{name: "Crystalize", power: 0, pryo:0,  info: "This bug turns into a Chrysalis"}]},
  {name: 'Aphid', rarity: 1, hp: 8, atk: 3, def: 3, spd: 6, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"},{name:"Nibble", power: 1, pryo:0,  info: "Will raise ally bug's stats when this bug runs out of hp"}]},
  {name: 'Bee', rarity: 1, hp: 2, atk: 7, def: 3, spd: 7, moves:[{name: "Sting", power: 3, pryo:0,  info: "This bug becomes ill"},{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}]},
  {name: 'Ladybug', rarity: 1, hp: 6, atk: 4, def: 4, spd: 6, moves:[{name: "Mandible Maul", power: 2, pryo:0,  info: "This bug takes a bite out of it's target"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Headlight Beetle', rarity: 1, hp: 5, atk: 5, def: 5, spd: 5, moves:[{name:"Luminous Burst", power: 1, pryo: 0, info: "Creates a bright area"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Pill Bug', rarity: 1, hp: 6, atk: 4, def: 6, spd: 4, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Worker Ant', rarity: 1, hp: 4, atk: 6, def: 6, spd: 4, moves:[{name: "Mandible Maul", power: 2, pryo:0,  info: "This bug takes a bite out of it's target"}, {name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}]},
  {name: 'Bullet Ant', rarity: 1, hp: 4, atk: 7, def: 6, spd: 3, moves:[{name: "Toxic Tincture", power: 1, pryo: 0, info: "Makes the target ill, doing damage over time"}, {name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}]},
  {name: 'Crane Fly', rarity: 1, hp: 3, atk: 4, def: 6, spd: 6, moves:[{name: "Infrared Impact", power: 2, pryo: 0, info: "Raises all stats if the area is bright"}, {name: "Vibes", power: 0, pryo: 0, info: "Raises this bugs speed"}]},
  {name: 'Flea', rarity: 1, hp: 4, atk: 2, def: 9, spd: 4, moves:[{name: "Lethal Lunge", power: 3, pryo: 0, info: "Lowers target's defence"}]},
  {name: 'Railroad Worm', rarity: 1, hp: 6, atk: 2, def: 2, spd: 8, moves:[{name:"Luminous Burst", power: 1, pryo: 0, info: "Creates a bright area"}, {name:"Nibble", power: 1, pryo:0,  info: "Will raise ally bug's stats when this bug runs out of hp"}]},
  {name: 'Cricket', rarity: 1, hp: 4, atk: 4, def: 7, spd: 3, moves:[{name:"Chirp", power: 1, pryo:0, info: "Resets this bug's target"}]},
  {name: 'Chameleon Grasshopper', rarity: 1, hp: 3, atk: 6, def: 8, spd: 2, moves:[{name: "Infrared Impact", power: 2, pryo: 0, info: "Raises all stats if the area is bright"}]},
  {name: 'Painted Grasshopper', rarity: 1, hp: 3, atk: 6, def: 8, spd: 2, moves:[{name: "Toxic Tincture", power: 1, pryo: 0, info: "Makes the target ill, doing damage over time"},]},
  {name: 'Dead Leaf Grasshopper', rarity: 1, hp: 3, atk: 6, def: 8, spd: 2, moves:[{name: "Floral Feint", power: 2, pryo: 0, info: "This move can't be blocked"}]},
  {name: 'Katydid', rarity: 1, hp: 5, atk: 5, def: 5, spd: 5, moves:[{name: "Floral Feint", power: 2, pryo: 0, info: "This move can't be blocked"}, {name: "Skitter", power: 1, pryo: 0, info: "The bug attacks and keeps running, clearing the area"}]},
  {name: 'Tiger Beetle', rarity: 1, hp: 5, atk: 7, def: 6, spd: 2, moves:[{name: "Twitch", power: 1, pryo: 1, info: "This move goes first"},{name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Antlion', rarity: 1, hp: 7, atk: 3, def: 7, spd: 3, moves:[{name: "Mandible Maul", power: 2, pryo:0,  info: "This bug takes a bite out of it's target"}, {name:"Prevention Trap", power: 0, pryo: 2, info: "Before attacks, this bug trys to set a trap to protect it's target"}]},
  {name: 'Weevil', rarity: 1, hp: 4, atk: 4, def: 4, spd: 4, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"}, {name: "Twitch", power: 1, pryo: 1, info: "This move goes first"}]},
  {name: 'Mosquito', rarity: 1, hp: 2,  atk: 1, def: 4, spd: 8, moves:[{name: "Toxic Tincture", power: 1, pryo: 0, info: "Makes the target ill, doing damage over time"}, {name:"Nibble", power: 1, pryo:0,  info: "Will raise ally bug's stats when this bug runs out of hp"}]},
  {name: 'Stag Beetle', rarity:2, hp: 4, atk: 3, def: 7, spd: 7, moves:[{name: "Shell Smash", power: 3, pryo:0,  info: "Lowers target's attack"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Hercules Beetle', rarity:2, hp: 9, atk: 8, def: 2, spd:  1, moves:[{name: "Mandible Maul", power: 2, pryo:0,  info: "This bug takes a bite out of it's target"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Locust', rarity:2, hp: 6, atk: 6, def: 6, spd: 7, moves:[{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}, {name: "Outbreak", power:1, pryo:0,  info:"Grasshoppers in your jar gain the move Swarm"}]},
  {name: 'Harvestmen', rarity:2, hp: 9, atk: 7,  def: 1, spd: 4, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"}, {name: "Skitter", power: 1, pryo: 0, info:"The bug attacks and keeps running, clearing the area"}]},
  {name: 'Walking Stick', rarity:2, hp: 6, atk: 5, def: 6, spd: 4, moves:[{name: "Floral Feint", power: 2, pryo: 0, info: "This move can't be blocked"}, {name: "Vibes", power: 0, pryo: 0, info: "Raises this bugs speed"}]},
  {name: 'House Fly', rarity:2, hp: 3, atk: 5, def: 4, spd: 7, moves:[{name: "Swift Strike", power: 2, pryo: 0, info:"Does more damage if this bug is faster that target"}, {name: "Vibes", power: 0, pryo: 0, info: "Raises this bugs speed"}]},
  {name: 'Cicada', rarity:2, hp: 4, atk: 8, def: 7,  spd: 1, moves:[{name:"Chirp", power: 1, pryo:0, info: "Resets this bug's target"}, {name: "Vibes", power: 0, pryo: 0, info: "Raises this bugs speed"}]},
  {name: 'Wasp', rarity:2, hp: 5, atk: 9, def: 4, spd: 6, moves:[{name: "Sting", power: 3, pryo:0,  info: "This bug becomes ill"}, {name: "Persistent", power: 0, pryo: 0, info:"This bug heals itself"}]},
  {name: 'Trapdoor Spider', rarity:2, hp: 8, atk: 5, def: 8, spd: 5, moves:[{name: "Toxic Tincture", power: 1, pryo: 0, info: "Makes the target ill, doing damage over time"},{name:"Prevention Trap", power: 0, pryo: 2, info: "Before attacks, this bug trys to set a trap to protect it's target"}]},
  {name: 'Cockroach', rarity:2,  hp: 10,  atk: 1, def: 9,  spd: 1, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"}, {name: "Persistent", power: 0, pryo: 0, info:"This bug heals itself"}]},
  {name: 'Dragonfly', rarity:2, hp: 3, atk: 8, def: 3, spd: 9, moves:[{name: "Lethal Lunge", power: 3, pryo: 0, info: "Lowers target's defence"}]},
  {name: 'Assassin Bug', rarity:2, hp: 2, atk: 8, def: 2, spd: 9, moves:[{name: "Apex Assault", power: 3, pryo: 0, info:"This bug attacks, backed up with a sense of dread"}]},
  {name: 'Lightning Bug', rarity:2, hp: 6, atk: 7, def: 6, spd: 6, moves:[{name: "Infrared Impact", power: 2, pryo: 0, info: "Raises all stats if the area is bright"}, {name:"Luminous Burst", power: 1, pryo: 0, info: "Creates a bright area"}]},
  {name: 'Leafcutter Ant', rarity:2, hp: 7, atk: 6,  def: 1, spd: 6, moves:[{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}, {name:'Cutting Edge', power: 0, pryo: 0, info: "Raise both bugs' attack"}]},
  {name: 'Door Head Ant', rarity:2, hp: 7,  atk: 1, def: 6, spd: 6, moves:[{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}, {name:'Carapace Castle', power: 0, pryo: 0, info: "Raise both bugs' defense"}]},
  {name: 'Chrysalis', rarity:2, hp: 5, atk: 1,  def: 10, spd: 3, moves:[{name: "Metamorphose", power: 0,  pryo:0,  info:"Emerge into a butterfly"}]},
  {name: 'Monarch Butterfly', rarity:3, hp: 5,  atk: 10, def: 5, spd: 5, moves:[{name: "Flutter Fury", power: 3, pryo: 0, info: "This bugs stikes with a fast series of blows"}, {name: "Butterfly Kiss", power: 0, pryo: 0, info: "Heals this bug and ally bug"}]},
  {name: 'Skipper Butterfly', rarity:3, hp: 5, atk: 5, def: 5,  spd: 10, moves:[{name: "Flutter Fury", power: 3, pryo: 0, info: "This bugs stikes with a fast series of blows"}, {name: "Butterfly Kiss", power: 0, pryo: 0, info: "Heals this bug and ally bug"}]},
  {name: 'Birdwing Butterfly', rarity:3, hp: 5, atk: 5, def: 10, spd: 5, moves:[{name: "Flutter Fury", power: 3, pryo: 0, info: "This bugs stikes with a fast series of blows"}, {name: "Butterfly Kiss", power: 0, pryo: 0, info: "Heals this bug and ally bug"}]},
  {name: 'Rhino Beetle', rarity:3,  hp: 10, atk: 5, def: 7, spd: 3, moves:[{name: "Apex Assault", power: 3, pryo: 0, info:"This bug attacks, backed up with a sense of dread"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Praying Mantis', rarity:3, hp: 5,  atk: 10, def: 3, spd: 7, moves:[{name: "Lethal Lunge", power: 3, pryo: 0, info: "Lowers target's defence"}, {name: "Twitch", power: 1, pryo: 1, info: "This move goes first"}]},
  {name: 'Tortoise Beetle',  rarity:3, hp: 7, atk: 3,  def: 10, spd: 5, moves:[{name:"Shell Smash", power:2, pryo: 0, info:"Lowers target's attack"}, {name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}]},
  {name: 'Horse Fly', rarity:3, hp: 3, atk: 7, def: 5,  spd: 10, moves:[{name: "Swift Strike", power: 2, pryo: 0, info:"Does more damage if this bug is faster that target"}, {name: "Vibes", power: 0, pryo: 0, info: "Raises this bugs speed"}]},
  {name: 'Queen Ant', rarity:3, hp: 7, atk: 6, def: 6, spd: 5, moves:[{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}, {name: "Royal Decree", power: 0, pryo: 0, info: "The bug commands ants to create an ant hill area at will heal ants a little every turn"}]},
  {name: 'Moth', rarity:3, hp: 5, atk: 6, def: 8, spd: 8, moves:[{name: "Flutter Fury", power: 3, pryo: 0, info: "This bugs stikes with a fast series of blows"}, {name: "Infrared Impact", power: 2, pryo: 0, info: "Raises all stats if the area is bright"}]},
  {name: 'Tarantula',  rarity:3, hp: 8, atk: 6, def: 6, spd: 6, moves:[{name: "Apex Assault", power: 3, pryo: 0, info:"This bug attacks, backed up with a sense of dread"},{name:"Prevention Trap", power: 0, pryo: 2, info: "Before attacks, this bug trys to set a trap to protect it's target"}]},
  {name: 'Orchid Mantis',  rarity:3, hp: 5, atk: 9, def: 5, spd: 6, moves:[{name: "Floral Feint", power: 2, pryo: 0, info: "This move can't be blocked"}, {name: "Lethal Lunge", power: 3, pryo: 0, info: "Lowers target's defence"}]},
  {name: 'Centipede', rarity:3, hp: 9, atk: 2, def: 9, spd: 8, moves:[{name:"Bug Bash", power: 2, pryo:0,  info: "This bug rams into it's target"}, {name: "Persistent", power: 0, pryo: 0, info:"This bug heals itself"}]}
]

export default bugs

