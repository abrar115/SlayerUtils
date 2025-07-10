import { dataAA } from '../data.js'
import { huds, Average, colors } from './Exports.js'
import settings from '../config.js'

const trm = new TextComponent(`&d[&3/surng &dtrm - &2Toggle Rng Meter Overlays&d]`).setHoverValue(`&bSuggests Command [/surng trm]`).setClick("suggest_command", "/surng trm")
const rnghelp = new TextComponent(`&cNo Such Command, Click To See All Commands [Rng Meter]`).setHoverValue(`&bSuggests Command [/surng help]`).setClick("suggest_command", "/surng help")

function getColor(name){
  let any = colors[settings[name]].slice(0,2)
  return any
}


const TierXP ={
   1.0: 5,
   2.0: 25,
   3.0: 125,
   4.0: 500,
   5.0: 1500
}

const nameMap = {
    "Revenant Horror": "Rev",
    "Tarantula Broodfather": "Tarantula",
    "Sven Packmaster": "Sven",
    "Voidgloom Seraph": "Eman",
    "Inferno Demonlord": "Blaze",
    "Riftstalker Bloodfiend": "Vamp"
}


let slayergui 
let name
let split
let BossesPH
let nowxp
let xpPH
let percent
let nowpercent
let repeat
let iteml = []
let found = false
let insb = false
let storedXP = null
const dash = "-"
function fullnumber(str) {
   if (typeof str !== "string") str = str.toString()
  const suffixes = {
    K: 1e3,
    M: 1e6,
    B: 1e9,
    T: 1e12
  }


  str = str.replace(/,/g, "")

  const lastChar = str[str.length - 1].toUpperCase()
  let numberPart = str

  if (suffixes[lastChar]) {
    numberPart = str.slice(0, -1)
    return parseFloat(numberPart) * suffixes[lastChar]
  }

  return parseFloat(numberPart)
}


function isSkyblock() {
    let skyblock = ChatLib.removeFormatting(Scoreboard.getTitle())
    
    if (skyblock == "SKYBLOCK") {
       
        insb = true
    }
    else {
         
        insb = false
    }
}

function formatNumber(num) {
    num = Number(num)
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "b"
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "m"
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "k"
    return num.toFixed(2)
}

register("guiOpened", () => {
  setTimeout(() => {
    const inv = Player.getContainer()
    if (!inv) return

    const title = ChatLib.removeFormatting(inv.getName())
    if (!title.endsWith("RNG Meter")) return
    guiName = title.replace(" RNG Meter", "")
    slayergui = nameMap[guiName] || "Unknown"
    if (slayergui == "Unknown") return
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i)
      if (!item) continue
      const lore = item.getLore().map(line => ChatLib.removeFormatting(line))
      for (let j = 0; j < lore.length; j++) {
        const line = lore[j]
        if (line.startsWith("Progress: ")) {
          percent = lore[j].replace("Progress: ", "")
          split = lore[j + 1].split("/")
          storedXP =  parseInt(split[0].replace(/,/g, ""))
        }
        if (line.startsWith("SELECTED")) {
          found = true
          name = item.getName()
          iteml.push(item)
          ChatLib.chat(`&6[SlayerUtils]: &3Found Selected RNG Meter Drop: ${name}`)
          
        }
      }
      
    }
    if (!found){
        ChatLib.chat(`&6[SlayerUtils]: &3No Selected RNG Meter Drop Found`)
      }
  }, 500)
})




register("chat", (msg) => {
    let hi = ChatLib.getChatMessage(msg).removeFormatting()
        if (hi.includes(`RNG METER! Reselected `) && dataAA.title == false){
      Client.showTitle(`§5RNG Meter Reselected`, `§bGotten ${name} At ${formatNumber(storedXP)} XP`, 50, 15, 10)
    }
     if (hi.includes("RNG Meter -") && hi.includes("Stored XP")) {
      
        let parts = hi.split(" ")
        let index = parts.indexOf("-") + 1
        let rawXP = parts[index]
        storedXP = parseInt(rawXP.replace(/,/g, '')) 
        
    }

})
const textHud = huds.createTextHud("test2", 120, 10, "&5Rng Meter :D")

textHud.onDraw((x, y, str) => {
    Renderer.translate(x, y)
    Renderer.scale(textHud.getScale())
    Renderer.drawStringWithShadow(str, 0, 0)
    Renderer.finishDraw()
})




register("command", (...args)=>{
  if (!args){
    ChatLib.chat(rnghelp)
  
    return
  }
  switch(args[0]){
    case("trm"):
    if (dataAA.slayer == false) dataAA.slayer = true
  else dataAA.slayer = false
  ChatLib.chat(`&b&lRng Meter Overlay &f&lToggled &7[&d${dataAA.slayer}&7]`)
  break
  case("help"):
  ChatLib.chat(trm)
  break
  default:
    ChatLib.chat(rnghelp)
  
  }
  
}).setName("SuRng").setAliases("surng")

register("renderOverlay", () => {
  if (huds.isOpen()) return
  isSkyblock()
  if (dataAA.slayer == true && insb == true){
  if (Average.Total && Average.Bosses && storedXP && Average.Name == slayergui) {
    BossesPH = (3600 * Average.Bosses / Average.Total).toFixed(2)
    xpPH = parseInt(BossesPH * parseFloat(TierXP[Average.Tier]))
    nowxp = formatNumber(storedXP)    
    const meterMax = fullnumber(split?.[1] || "1") 

nowpercent = (storedXP  * 100 / meterMax).toFixed(2)

repeat = Math.floor(nowpercent / 5)
repeat = Math.max(0, Math.min(20, repeat)) 
ion = (fullnumber(meterMax)-storedXP)/xpPH


 let estimatedTime = typeof ion === "number" ? ion.toFixed(2) + " Hours" : ion


let Text = `${getColor("RngTitleColor")}Detected RNG Meter Slayer: ${slayergui}\n${getColor("RngItemColor")}Detected RNG Meter Item: ${name}\n${getColor("RngMeterColor")}RNG Meter: ${nowpercent}%   &7[${getColor("RngTimeColor")}Estimated Time: ${getColor("RngValuesColor")}${estimatedTime} &7]\n${getColor("RngBarColor")}${dash.repeat(repeat)}&7${dash.repeat(20 - repeat)}\n${getColor("RngMeterColor")}RNG Meter: ${getColor("RngValuesColor")}${nowxp}/${meterMax}`

    Renderer.translate(textHud.getX(), textHud.getY())
    Renderer.scale(textHud.getScale())
    Renderer.drawStringWithShadow(Text, 0, 0) 
    iteml[iteml.length -1].draw(textHud.getX() + 225, textHud.getY() + 4 , textHud.getScale()) 
    Renderer.finishDraw()
  }
  else if(Average.Total && Average.Bosses && storedXP && Average.Name!==slayergui){
const meterMax = fullnumber(split?.[1] || "1")
nowpercent = (storedXP  * 100 / meterMax).toFixed(2)
repeat = Math.floor(nowpercent / 5)
repeat = Math.max(0, Math.min(20, repeat))
    nowxp = formatNumber(storedXP)
    let Text = `&c&l[Select RNG Meter For Current Slayer]\n${getColor("RngTitleColor")}Detected RNG Meter Slayer: ${slayergui}\n${getColor("RngItemColor")}Detected RNG Meter Item: ${name}\n${getColor("RngMeterColor")}RNG Meter: ${nowpercent}%\n${getColor("RngBarColor")}${dash.repeat(repeat)}&7${dash.repeat(20 - repeat)}\n${getColor("RngMeterColor")}RNG Meter: ${getColor("RngValuesColor")}${nowxp}/${meterMax}`

    Renderer.translate(textHud.getX(), textHud.getY())
    Renderer.scale(textHud.getScale())
    Renderer.drawStringWithShadow(Text, 0, 0) 
    Renderer.finishDraw()
  }
  else{
    Renderer.translate(textHud.getX(), textHud.getY())
    Renderer.scale(textHud.getScale())
    Renderer.drawStringWithShadow(`&b=> Open RNG Meter &7[&5/rngmeter&7]\n&b&e=> Kill A Slayer Boss \n&3=> And Select Desired Slayer\n&c=> Profit :D`, 0, 0)
    Renderer.finishDraw()
  }}
})
