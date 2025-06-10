import {dataAA} from "./data.js"
import "./Features/PetChcker.js"
import "./Features/PbAvt.js"
import "./Features/rngMeter.js"
import "./config.js"

if (dataAA.first == false){
        ChatLib.chat(`&3&lTanks &5&lFor &d&lDownloading &b&l&oSlayerUtils &f&l:D`)
}
dataAA.first = true

dataAA.load = false
register("worldLoad", ()=>{
    if (dataAA.load == false) {
    ChatLib.chat(`&d&l[SlayerUtils] &5&lLoaded || &f&lType &3&l/Su &e&lTo Open Gui || &b&l/SuHelp §e&lFor All Commands.`)
    dataAA.load = true
    }
})

register("command", () => {
    
const tc = new TextComponent("&8➝  &aCombat Overlay").setHoverValue("&bToggles Combat Exp Overlay.").setClick("suggest_command", "/tcr")
const tcr = new TextComponent("&8➝  &aCombat Overlay Reset").setHoverValue("&bResets Combat Exp Overlay.").setClick("suggest_command", "/rsxp")
const pc = new TextComponent("&8➝  &aPet Overlay").setHoverValue("&bToggles Pet Exp Overlay.").setClick("suggest_command", "/tpr")
const etc = new TextComponent("&8➝  &aCombat OverlayEdit").setHoverValue("&bEdits Combat Exp Overlay.").setClick("suggest_command", "/cm")
const avt = new TextComponent("&8➝  &aAverage Times").setHoverValue("&bShows Spawn, kill, and Total time for the last 5 bosses.").setClick("suggest_command", "/avt")
const pb = new TextComponent("&8➝  &aPersonal Best").setHoverValue("&bShows personal best for slayers (use: pb[r,t,s,e,b])").setClick("suggest_command", "/pb")
const trm = new TextComponent("&8➝  &aRNG Meter").setHoverValue("&bToggles RNG Meter Overlay.").setClick("suggest_command", "/trm")
const rm = new TextComponent("&8➝  &aRNG Meter Edit").setHoverValue("&bEdit RNG Meter Overlay").setClick("suggest_command", "/rm")
const chat = new TextComponent("&8➝  &aToggle Chat").setHoverValue("&bToggles Warning Messages").setClick("suggest_command", "/tc")
const g = new TextComponent("&8➝  &aGui").setHoverValue("&bOpens Gui.").setClick("suggest_command", "/su")

    ChatLib.chat(`&d&lSlayerUtils &b&lCommands: `)
    ChatLib.chat(tc)
    ChatLib.chat(pc)
    ChatLib.chat(tcr)
    ChatLib.chat(etc)
    ChatLib.chat(avt)
    ChatLib.chat(pb)
    ChatLib.chat(trm)
    ChatLib.chat(rm)
    ChatLib.chat(chat)
    ChatLib.chat(g)
    
    
    
    ChatLib.chat("&7[§eHover&7] for description  &7[§eClick&7] to suggest command.")
}).setName("SuHelp").setAliases("suh")

