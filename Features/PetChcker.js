import { dataAA } from "../data.js"
import { state } from "./variables.js"
import { ResetCombatXp,  colors,   huds } from "./Exports.js"
import settings from "../config.js"

function getColor(name){
  let any = colors[settings[name]].slice(0,2)
  return any
}
const prefix1 = `&6[SlayerUtils]`

const textHud1 = huds.createTextHud("idk", 120, 10, "&5Combat Overlay :D")
const textHud2 = huds.createTextHud("idk2", 120, 50, "&5Pet Overlay :D")

const help = new TextComponent(`&cNo Such Command, Click To See All Commands [Pets]`).setHoverValue(`&bSuggests Command [/supr help]`).setClick("suggest_command", "/supr help")
const combat = new TextComponent(`&d[&3/supr &dtcr - &2Toggles Combat Exp Overlay&d]`).setHoverValue(`&bSuggests Command [/supr tcr]`).setClick("suggest_command", "/supr tcr")
const pet = new TextComponent(`&d[&3/supr &dtpr - &2Toggles Pet Exp Overlay&d]`).setHoverValue(`&bSuggests Command [/supr tpr]`).setClick("suggest_command", "/supr tpr")
const rsxp = new TextComponent(`&d[&3/supr &drsxp - &2Resets Exp Overlays&d]`).setHoverValue(`&bSuggests Command [/supr rsxp]`).setClick("suggest_command", "/supr rsxp")
const PetMessage = new TextComponent(`${prefix1} &5&lNo Pet Equipped, Please Equip Desired Pet To Calculate Pet Exp Per Hour.`).setHoverValue("&bClick To Open Pets Menu").setClick("run_command", "/pets")
const Taming = new TextComponent(`${prefix1} &5&lTaming Level Not Updated, Please Do /skills.`).setHoverValue("&bClick To Open Skills Menu").setClick("run_command", "/skills")
const Beastmaster = new TextComponent(`${prefix1} &5&lBeastmaster Crest Not Found, Please Open Accessory Bag.`).setHoverValue("&bClick To Open Accessory Bag").setClick("run_command", "/ab")

let insb = false
let times = 0
function isSkyblock() {
    let skyblock = ChatLib.removeFormatting(Scoreboard.getTitle())
    
    if (skyblock == "SKYBLOCK") {
       
        insb = true
    }
    else {
         
        insb = false
    }
}

const petTypeMap = {            
    "Combat Pet": "Combat",
    "Combat Mount": "Combat",
    "Mining Pet": "Mining",
    "Mining Mount": "Mining",
    "Fishing Pet": "Fishing",
    "Farming Pet": "Farming",
    "Foraging Pet": "Foraging",
    "Enchanting Pet": "Enchanting",
}
let displayName = ""
let heldItem = null
let heldItemBoost = null
let petType = "Unknown"
let heldItemBoostValue = 0
let PetTypeValue
register("guiOpened", () => {
    setTimeout(() => {
        const inv = Player.getContainer()
        if (!inv) return

        const title = ChatLib.removeFormatting(inv.getName())
        if (!title.includes("Pets")) return

        let foundEquippedPet = false

       for (let i = 0; i < inv.getSize(); i++) {
    let item = inv.getStackInSlot(i)
    if (!item) continue

    let lore = item.getLore().map(line => ChatLib.removeFormatting(line))
    if (lore.length === 0) continue

    let isEquipped = false
    heldItem = null
    heldItemBoost = null
    petType = "Unknown"
    heldItemBoostValue = 1 // ✅ Reset value for this pet

    for (let j = 0; j < lore.length; j++) {
        let line = lore[j]

        if (line.toLowerCase().includes("click to despawn")) isEquipped = true

     if (line.startsWith("Held Item:")) {
    heldItem = line.replace("Held Item:", "").trim();
    heldItemBoost = (j + 1 < lore.length) ? lore[j + 1].trim() : null;

    heldItemBoostValue = 1; // Reset to default

    if (heldItemBoost && heldItemBoost.toLowerCase().includes("exp")) {
        const match = heldItemBoost.match(/\+(\d+)%/);
        if (match) {
            heldItemBoostValue = parseInt(match[1]);
        }
    }

    
}
      for (const rawType in petTypeMap) {
            if (line.includes(rawType)) {
                petType = petTypeMap[rawType]
                break
            }
        }
    }

    if (isEquipped) {
        foundEquippedPet = true    
        displayName = ChatLib.removeFormatting(item.getName())
        ChatLib.chat(`${prefix1} &b&lEquipped Pet Detected: ${displayName}`)
        break
    }
}


        if (!foundEquippedPet) ChatLib.chat(`${prefix1} &b&lNo pet detected to be equipped. Equip a pet or go to the next page.`)
        if (petType == "Combat") PetTypeValue = 1
        else PetTypeValue = 1/3
        if (heldItem.includes("Combat"))  heldItemBoostValue = heldItemBoostValue
         else heldItemBoostValue = 1
            
        
    }, 100) 
})




let level = 1
register("guiOpened", () => {                 
    setTimeout(() => {
        let inv = Player.getContainer()
        if (!inv) return

        let title = ChatLib.removeFormatting(inv.getName())
        if (!title.includes("Your Skills")) return
       

        for (let i = 0; i < inv.getSize(); i++) {
            let item = inv.getStackInSlot(i)
            
            let  name = ChatLib.removeFormatting(item.getName()).trim()

            if (name.startsWith("Taming ")) {
                level = name.split(" ")[1] // Get the number after "Taming"
                ChatLib.chat(`${prefix1} &b&lFound Taming Level: ${level}`)
                break
            }

        }
    }, 100)
})



let found = false 
let petboost = 0

register("guiOpened", () => {                          
    setTimeout(() => {
        let inv = Player.getContainer()
        if (!inv) return

        let title = ChatLib.removeFormatting(inv.getName())
        if (!title.includes("Accessory Bag")) return

        found = false
        petboost = 0
        for (let i = 0; i < inv.getSize(); i++) {
            let item = inv.getStackInSlot(i)
            if (!item || item.getName() === null || item.getName().includes("AIR")) continue
            let lore = item.getLore().map(line => ChatLib.removeFormatting(line))
            if (lore.length === 0) continue
            for (let j = 0; j < lore.length; j++) {
                let line = lore[j]
                if (line.startsWith("Pet Exp Boost:")) {
                    petboost = line.replace("Pet Exp Boost: +", "").trim()
                    
                    if (j + 1 < lore.length) heldItemBoost = lore[j + 1].trim()
                }
            }
            let name = ChatLib.removeFormatting(item.getName()).trim()
            if (name.toLowerCase().includes("beastmaster crest")) {
                found = true
                ChatLib.chat(`${prefix1} &b&lFound: ${name} || Pet Boost: ${petboost}`)
                

                break
            }
        }

        if (!found && times < 5) {
            times++
            ChatLib.chat(`${prefix1} &5&lNo Beastmaster Crest found in Accessory Bag.`)
        }
    }, 150) 
})


register("step", ()=>{
    isSkyblock()
    if (insb == true && times < 5 && dataAA.Chat == false) {
        times++
    if (displayName === "")ChatLib.chat(PetMessage)     
    if (level == 1) ChatLib.chat(Taming)
    if (!found)ChatLib.chat(Beastmaster)
}
}).setDelay(10)



state.tracking = false
state.startXP = 0
state.lastXP = 0
state.startTime = 0
state.lastKnownXP = 0
state.gained = 0 
function formatNumber(num) {
    num = Number(num)
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "b"
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "m"
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "k"
    return num.toFixed(2)
}




function toggleCombat(){
    if (dataAA.combat == true) dataAA.combat = false
    else dataAA.combat = true
    ChatLib.chat(`&b&lCombat Exp Overlay &f&lToggled &7[&d${dataAA.combat}&7]`)
}


function togglePet(){
    if (dataAA.pet == true) dataAA.pet = false
    else dataAA.pet = true
    ChatLib.chat(`&b&lPet Exp Overlay &f&lToggled &7[&d${dataAA.pet}&7]`)
}


register("command", (...args)=>{
    if (!args[0]){
        ChatLib.chat(help)
       return
    }
    switch(args[0]){
        case("rsxp"):
        ResetCombatXp()
        break
        case("tcr"):
        toggleCombat()
        break
        case("tpr"):
        togglePet()
        break
        case("help"):
        ChatLib.chat(rsxp)
        ChatLib.chat(combat)
        ChatLib.chat(pet)
        break
        default:
            ChatLib.chat(help)

    }
}).setName("supr")


state.seenInitialXP = false

register("step", () => {
    const item = Player.getHeldItem()
    if (!item) return

    const nbt = item.getNBT()?.toObject()
    const xp = nbt?.tag?.ExtraAttributes?.champion_combat_xp
    if (xp === undefined) return

    if (!state.seenInitialXP) {
        state.lastXP = xp
        state.seenInitialXP = true
        return 
    }

    
    if (!state.tracking && xp > state.lastXP) {
        state.tracking = true
        state.startXP = state.lastXP
        state.startTime = Date.now()
        
    }

    state.lastXP = xp
    state.lastKnownXP = xp
}).setFps(2)

textHud1.onDraw((x, y, str) => {
    Renderer.translate(x, y)
    Renderer.scale(textHud1.getScale())
    Renderer.drawStringWithShadow(str, 0, 0)
    Renderer.finishDraw()
})

textHud2.onDraw((x, y, str) => {
    Renderer.translate(x, y)
    Renderer.scale(textHud2.getScale())
    Renderer.drawStringWithShadow(str, 0, 0)
    Renderer.finishDraw()
})



let petXP = 0
register("renderOverlay", () => {
   if (insb && dataAA.combat == true) {
    let combatText
    if (state.lastKnownXP === 0 ) {
        
        if (!Player.getHeldItem()) {
          combatText =  "§cNo weapon held"
        } else {
           combatText = "§7Champion XP not tracked yet"
        }
        return
    }

    state.gained = 0
    let elapsedMin = 0
    let xpPerHour = 0

    if (state.tracking) {
        state.gained = Math.floor(state.lastKnownXP) - Math.floor(state.startXP)
        elapsedMin = (Date.now() - state.startTime) / 60000
        xpPerHour = elapsedMin > 0 ? (state.gained * 60 / elapsedMin) : 0
        combatText = `${getColor("TitleColor")}Champion XP Tracker: \n${getColor("GainedColor")}Gained: ${getColor("ValuesColor")}${formatNumber(state.gained)} ${getColor("GainedColor")}\n${getColor("TimeColor")}Time: ${getColor("ValuesColor")}${elapsedMin.toFixed(1)}m\n${getColor("RateColor")}Rate: ${getColor("ValuesColor")}${formatNumber(xpPerHour)} xp/hr`
    } else {
        combatText = `§cTracking not started, Gain Combat Exp To Start.`
    }
     Renderer.translate(textHud1.getX(), textHud1.getY())
    Renderer.scale(textHud1.getScale())
    Renderer.drawStringWithShadow(combatText, 0, 0) 
    Renderer.finishDraw()
}
if (insb && dataAA.pet == true){    
    let petText
    if (state.lastKnownXP === 0 || !state.tracking) return;
  
    const baseXP = state.lastKnownXP - state.startXP;
    const beastmasterMult = 1 + (parseFloat(petboost) / 100 || 0);
    const tamingBonus = 1 + (parseFloat(level) / 100);
    const heldItemBonus = 1 + (parseFloat(heldItemBoostValue) / 100);

    const effectiveXP = baseXP * beastmasterMult;
    const petXP = effectiveXP * tamingBonus * heldItemBonus * PetTypeValue;

    const elapsedMin = (Date.now() - state.startTime) / 60000;
    const petXPPerHour = elapsedMin > 0 ? (petXP * 60 / elapsedMin) : 0;


petText = `${getColor("TitleColorp")}Pet XP Tracker: \n${getColor("PetPetp")}Pet: ${displayName}\n${getColor("PetGainedp")}Pet XP Gained:  ${getColor("ValuesColorp")}${formatNumber(petXP)}\n${getColor("RateColorp")}Rate: ${getColor("ValuesColorp")}${formatNumber(petXPPerHour)} xp/hr`
Renderer.translate(textHud2.getX(), textHud2.getY())
    Renderer.scale(textHud2.getScale())
    Renderer.drawStringWithShadow(petText, 0, 0) 
    Renderer.finishDraw()
}})


