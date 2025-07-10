import { datarev } from "../data.js"
import { datatara } from "../data.js"
import { datasven } from "../data.js"
import { dataeman } from "../data.js"
import { datablaze1 } from "../data.js"
import { Average } from "./Exports.js"


const clicktext = new TextComponent(`&d[&3/supb &davt - &2Average Times Of Last 5 Bosses&d]`).setHoverValue(`&bSuggests Command [/supb avt]`).setClick("suggest_command", "/supb avt")
const clicktext2 = new TextComponent(`&d[&3/supb &dpb(r/t/s/e/b) - &2Personal Best Of Slayers&d]`).setHoverValue(`&bSuggests Command [/supb pb()]`).setClick("suggest_command", "/supb pb")
const clicktext3 =  new TextComponent(`&cNo Such Command, Click To See All Commands [Slayers]`).setHoverValue(`&bSuggests Command [/supb help]`).setClick("suggest_command", "/supb help")

const maxRuns = 5
const bossRuns = []
const prefix = `&6[SlayerUtils]: `

const nameMap = {
    "Revenant Horror": "Rev",
    "Tarantula Broodfather": "Tarantula",
    "Sven Packmaster": "Sven",
    "Voidgloom Seraph": "Eman",
    "Inferno Demonlord": "Blaze",
    "Riftstalker Bloodfiend": "Vamp"
}


let bossKill = null
let bossActive = false
let bossSpawn = null
let bossSpawnActive = false
let killTime = null
let spawnDuration = null
let total = null
let specificName = ""
let tier = null
function romanToNumber(roman) {
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5 }
    return map[roman] || 0
}

register("step", () => {
    const playerName = Player.getName()
    let spawnTagFound = false
    let bossEntityFound = false

    World.getAllEntities().forEach(entity => {
        if (!entity || !entity.getName) return

        const name = entity.getName().removeFormatting().trim()
        
        if (entity.getClassName() === "EntityArmorStand" && name.startsWith(`Spawned by: ${playerName}`)) {
           
            spawnTagFound = true

           if (!bossActive) {
    bossActive = true
    bossKill = Date.now()


World.getAllEntities().forEach(e => {
    if (!e || !e.getName) return

    const raw = e.getName().removeFormatting().trim()
    const clean = raw.replace(/§./g, "").trim()

if (clean.includes("Revenant Horror")|| clean.includes("Tarantula Broodfather")|| clean.includes("Inferno Demonlord")||clean.includes("Voidgloom Seraph")||clean.includes("Sven Packmaster")){
    
const match = clean.match(/(Revenant Horror|Tarantula Broodfather|Inferno Demonlord|Voidgloom Seraph|Sven Packmaster|Riftstalker Bloodfiend)/)
const tiermatch = clean.match(/\b(I|II|III|IV|V)\b/)
    if (match[1]) {   
specificName = nameMap[match[1]] || "Unknown"
romantier = tiermatch ? tiermatch[1] : "N/A"
tier = romanToNumber(romantier)
}}})
if (bossSpawnActive) {
    spawnDuration =((Date.now() - bossSpawn) / 1000).toFixed(1)
    bossSpawnActive = false
    bossSpawn = null

}}}
    const rawName = entity?.getName?.()
if (rawName && rawName.toLowerCase().includes("boss")) {
bossEntityFound = true
}})

    
    if (bossActive && !spawnTagFound) {
         killTime = ((Date.now() - bossKill) / 1000).toFixed(1)
         total = parseFloat(killTime) + parseFloat(spawnDuration)
        ChatLib.chat(`${prefix}: &bSpawn Time: &5${spawnDuration}s`)
        ChatLib.chat(`${prefix}: &bKill Time: &5${killTime}s`)
        ChatLib.chat(`${prefix}: &bTotal Time: &5${total.toFixed(2)}s`)
        bossActive = false
        bossKill = null
bossRuns.push({
   "Name": specificName,
   "tier": tier,
  "Spawn": spawnDuration,
  "Kill": killTime,
  "Total": total
                })
                if (bossRuns.length > maxRuns) bossRuns.shift()

        
        if (!bossSpawnActive) {
            bossSpawnActive = true
            bossSpawn = Date.now()
            
        }
        if (spawnDuration) {
     Average.Name = specificName       
    Average.Spawn += parseFloat(spawnDuration)
Average.Kill += parseFloat(killTime)
Average.Total += parseFloat(total)
Average.Tier = parseInt(tier)
Average.Bosses += 1
}

    }
    
}).setFps(20)





function handlePersonalBest(bossName, dataStore, useFixed = true) {

  const didMatch = specificName === bossName

  const shouldUpdate = didMatch &&
    (tier > dataStore.tier || (tier === dataStore.tier && total < dataStore.total))

  if (shouldUpdate) {
    dataStore.name = bossName
    dataStore.spawn = spawnDuration
    dataStore.kill = killTime
    dataStore.total = total
    dataStore.tier = tier
  }

  const totalTime = useFixed ? dataStore.total.toFixed(2) : dataStore.total

  ChatLib.chat(ChatLib.getChatBreak("&5-"))
  ChatLib.chat(`${prefix} &bPersonal Best for: &5${dataStore.name} T${dataStore.tier}`)
  ChatLib.chat(`${prefix} &bSpawn: &5${dataStore.spawn}`)
  ChatLib.chat(`${prefix} &bKill: &5${dataStore.kill}`)
  ChatLib.chat(`${prefix} &bTotal: &5${totalTime}`)
  ChatLib.chat(ChatLib.getChatBreak("&5-"))
}



register("command", (...args)=>{
if (!args) {
    ChatLib.chat(clicktext3)
   
return
}
    switch(args[0]){
     case("avt"):
        if (!bossRuns.length) {
        ChatLib.chat("&cNo boss runs recorded yet.")
        return
    }

    ChatLib.chat("&6Last 5 boss runs:")
bossRuns.forEach((run, i) => {
    ChatLib.chat(`&e#${i + 1}: &bSlayer: &6${run.Name} &bTier: &6${run.tier} &bSpawn: &6${run.Spawn}s &bKill: &6${run.Kill}s &bTotal: &6${run.Total.toFixed(2)}s`)
})
    break 
    case("pbr"):
    handlePersonalBest("Rev", datarev)
    break
    case("pbt"):
    handlePersonalBest("Tarantula", datatara)
    break
    case("pbs"):
    handlePersonalBest("Sven", datasven)
    break
    case("pbe"):
    handlePersonalBest("Eman", dataeman)
    break
    case("pbb"):
    handlePersonalBest("Blaze", datablaze1)
    break
    case("help"):
    ChatLib.chat(clicktext)
    ChatLib.chat(clicktext2)
   
    break
    default:
        ChatLib.chat(clicktext3)
       
} 
}).setName("supb")

