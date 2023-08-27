const trickets = [
  {name: "Crumb", rarity: "123", type:"a", search: "Ant",  effect: "Attracts Ants and they attract Antlions"},
  {name: "Leafy Stick", rarity: "123", type:"a", search: "Caterpillar Chrysalis Butterfly", effect: "Attracts the Caterpillars, Chrysalises, and Butterflies"},
  {name: "Blue Glowstick", rarity: "1", type:"a", search:"Headlight Railroad", effect: "Attracts Headlight Beetles and Railroad Worms"},
  {name: "Flash Light", rarity: "13", type:"a", search: "Moth Mosquito", effect: "Attracts Moths and Mosquitoes"},
  {name: "Scat", rarity: "123", type:"a", search: "Fly", effect: "Attracts Flies"},
  {name: "Yellow Toy Sub", rarity: "123", search: "Beetle", type: "a", effect: "Attracts Beetles"},
  {name: "Honey", rarity: "12", search: "Bee Wasp", type: "a", effect: "Attracts Bees and Wasps"},
  {name: "Bait Worms", rarity: "2", search: "Assassin Dragonfly", type: "a", effect: "Attracts Assassin Bugs and Dragonflies"},
  {name: "Rotting Log", rarity: "12", search: "Lightning Pill", type: "a", effect: "Attracts Lightning Bugs and Pill Bugs"},
  {name: "Pyramid Shaped Rock", rarity: "12", type: "a", search: "Locus Grasshopper", effect: "Attracts Locus and Grasshoppers"},
  {name: "Pesticide", type:"m", move:{name: "Toxic Tincture", power: 1, pryo: 0, info: "Makes the target ill, doing damage over time"}, effect: "Modifies a bug to know Toxic Tincture that wouldn't normally"},
  {name: "Vinylanisole", type:"m", move:{name: "Swarm", power: 1, pryo:0,  info: "Becomes stronger the more bugs in your jar that know it"}, effect: "Modifies a bug to know Swarm that wouldn't normally"},
  {name: "Growth Hormone", type:"m", move:{name: "Apex Assault", power: 3, pryo: 0, info:"This bug attacks, backed up with a sense of dread"}, effect: "Modifies a bug to know Apex Assult that wouldn't normally"},
  {name: "Chitin", type:"m", move:{name: "Shell Shield", power: 0,  pryo:2,  info: "Before attacks, this bug tries to protect itself"}, effect: "Modifies a bug to know Shell Shield that wouldn't normally"},
  {name: "Tymbals", type:"m", move:{name:"Chirp", power: 1, pryo:0, info: "Resets this bug's target"}, effect: "Modifies a bug to know Chirp that wouldn't normally"},
  {name: "Silk Line", type:"m", move:{name:"Prevention Trap", power: 0, pryo: 2, info: "Before attacks, this bug trys to set a trap to protect it's target"}, effect: "Modifies a bug to know Prevention Trap that wouldn't normally"},
  {name: "Adrenaline", type:"m", move:{name: "Twitch", power: 1, pryo: 1, info: "This move goes first"}, effect: "Modifies a bug to know Twitch that wouldn't normally"},
  {name: "Formication", type:"m", move:{name: "Skitter", power: 2, pryo: 0, info: "The bug attacks and keeps running, clearing the arena"}, effect: "Modifies a bug to know Skitter that wouldn't normally"},
  {name: "Cordyceps", type:"i", inft: 1, effect: "Infect a bug, eventually making it a zombie"},
  {name: "Hair Worm", type:"i", inft: 2, effect: "Infect a bug, making it stronger but locking into one move"},
]

export default trickets
