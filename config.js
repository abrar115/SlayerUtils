import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { FramebufferUtils } from "../Framebuffers";
import { dataAA } from "./data.js"
import { ResetCombatXp, combatOpen } from "./Features/PetChcker.js"
import { move } from "./Features/rngMeter.js";
const schemes = ["data/ColorScheme.json", "data/scheme-vigil.json", "data/scheme-nwjn.json"]
const colors = ["§0Black", "§1Dark Blue", "§2Dark Green", "§3Dark Aqua", "§4Dark Red", "§5Dark Purple", "§6Gold", "§7Gray", "§8Dark Gray", "§9Blue", "§aGreen", "§bAqua", "§cRed", "§dLight Purple", "§eYellow", "§fWhite"]
const CHANGELOG = `No Changes yet :D`
const CREDITS = FileLib.read("Amaterasu", "CREDIT.md")
const defaultConf = new DefaultConfig("SlayerUtils", "data/settings.json")

.addSwitch({
    category: "Slayer",
    configName: "CombatOverlay",
    title: "Combat Overlay",
    description: "Toggles Combat Exp Overlay.",
    tags: ["overlay", "render", "combat"],
   registerListener(previous, now){  
    if (now == true)      {
            dataAA.combat = true
        ChatLib.chat(`&bCombat Exp Overlay &fToggled &7[§aEnabled&7]`)
    }
       else{
        dataAA.combat = false
         ChatLib.chat(`&bCombat Exp Overlay &fToggled &7[&cDisabled&7]`)
       } }
})

.addSwitch({
    category: "Slayer",
    configName: "PetOverlay",
    title: "Pet Overlay",
    description: "Toggles Pet Exp Overlay.",
    tags: ["overlay", "render", "pet"],
    registerListener(previous, now){  
    if (now == true)      {
            dataAA.pet = true
       ChatLib.chat(`&5Pet Exp Overlay &fToggled &7[§aEnabled&7]`)
    }
       else{
        dataAA.pet = false
        ChatLib.chat(`&5Pet Exp Overlay &fToggled &7[&cDisabled&7]`)
       } }
})

.addButton({
    category: "Slayer",
    configName: "Reset Combat XP",
    title: "Reset Combat Overlay",
    description: "Resets Combat Exp Overlay.",
    tags: ["reset",  "combat"],
    shouldShow: data => data.CombatOverlay || data.PetOverlay,
    onClick(setting){
            ResetCombatXp()
            
    }
})

.addButton({
    category: "Slayer",
    configName: "Edit Combat XP Overlay",
    title: "Edit Overlay",
    description: "Edits Combat XP Overlay.",
    tags: ["edit", "move", "combat"],
    shouldShow: data => data.CombatOverlay || data.PetOverlay,
    onClick(setting){
            combatOpen()
            
    }
})
 .addMultiCheckbox({
        category: "Customization",
        configName: "multiCheckBoxTest",
        
        title: "Combat Overlay Customization",
        description: "Select Different Colors For Each Part Of The Overlay.",
        placeHolder: "Bonk", 
        options: [
            {
                title: "[Title]",
                configName: "CombatTitle",
                value: false,
               
            },
            {
                title: "[Gained]",
                configName: "CombatGained",
                value: false
            },
            {
                title: "[Time]",
                configName: "CombatTime",
                value: false
            },
            {
                title: "[Rate]",
                configName: "CombatRate",
                value: false
            },
            {
                title: "[Values]",
                configName: "CombatValues",
                value: false
            }
        ]
    })
.addDropDown({
    title: "Combat Overlay Colors [Title]",
    configName: "TitleColor",
    description: "Select A Color For The Title",
    category: "Customization",
    shouldShow: data => data.CombatTitle,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Combat Overlay Colors [Gained XP]",
    configName: "GainedColor",
    description: "Select A Color For The Gained XP",
    category: "Customization",
    shouldShow: data => data.CombatGained,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Combat Overlay Colors [Time Elapsed]",
    configName: "TimeColor",
    description: "Select A Color For The Time Elapsed",
    category: "Customization",
    shouldShow: data => data.CombatTime,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Combat Overlay Colors [Rates]",
    configName: "RateColor",
    description: "Select A Color For The Rate",
    category: "Customization",
    shouldShow: data => data.CombatRate,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Combat Overlay Colors [Values]",
    configName: "ValuesColor",
    description: "Select A Color For The Values",
    category: "Customization",
    shouldShow: data => data.CombatValues,
    options: colors,
    value: 0,
    
})

.addButton({
    category: "Customization",
    configName: "absOverlay",
    title: "Edit Overlay",
    description: "Edits RNG Meter Overlays Position.",
    tags: ["edit", "move", "meter"],
    onClick(setting) {
        const rateColor = getColor("RateColor")
        ChatLib.chat(`${rateColor}Current Rate Color:`);
    }
})


.addSwitch({
    category: "Slayer",
    configName: "rng",
    title: "RNG Meter Overlay",
    description: "Toggles RNG Meter Overlay.",
    tags: ["overlay", "render", "Meter"],
    
    registerListener(previous, now){  
    if (now == true)      {
            dataAA.slayer = true
       ChatLib.chat(`&3RNG Meter Overlay &fToggled &7[§aEnabled&7]`)
    }
       else{
        dataAA.slayer = false
        ChatLib.chat(`&3RNG Meter Overlay &fToggled &7[&cDisabled&7]`)
       } },
       
})

.addButton({
    category: "Slayer",
    configName: "Move Overlay",
    title: "Edit Overlay",
    description: "Edits RNG Meter Overlays Position.",
    tags: ["edit",  "move", "meter"],
    shouldShow: data => data.rng,
    onClick(setting){
            move()     
    }
})

.addSwitch({
    category: "Slayer",
    configName: "title",
    title: "RNG Meter Title",
    description: "Flashes On Screen If Selected RNG Meter Item Dropped.",
    tags: ["title", "Meter"],
    
    registerListener(previous, now){  
    if (now == true)      {
            dataAA.title = true
       ChatLib.chat(`&1RNG Meter Title &fToggled &7[§aEnabled&7]`)
    }
       else{
        dataAA.title = false
        ChatLib.chat(`&1RNG Meter Title &fToggled &7[&cDisabled&7]`)
       } },
       
})


.addSwitch({
    category: "Slayer",
    configName: "Toggle Warning Messages",
    title: "Toggle Messages",
    description: "Toggles Warning Messages.",
    tags: ["message",  "toggle" ],
    registerListener(previous, now){  
    if (now == true)      {
            dataAA.Chat = true
       ChatLib.chat(`&cChat Warning Messages &fToggled &7[§aEnabled&7]`)
    }
       else{
        dataAA.Chat = false
        ChatLib.chat(`&cChat Warning Messages &fToggled &7[§cDisabled&7]`)
       } }
})



        const config = new Settings("SlayerUtils", defaultConf, "data/ColorScheme.json")

    
    .setCommand("Su", ["su"])

   
    .addMarkdown("Changelog", CHANGELOG)
    .addMarkdown("Credits", CREDITS)

  .onOpenGui(() => {
        World.playSound("mob.cow.say", 5, 5)
        if (!FramebufferUtils.isShaderActive()) {
      FramebufferUtils.applyPostShader("blur");
   }
    })   
    .onCloseGui(()=>{
        World.playSound("mob.cow.hurt", 5,5)
        FramebufferUtils.cleanupPostShader();
    })


const currentScheme = schemes[config.settings.scheme]
const scheme = JSON.parse(FileLib.read("SlayerUtils", currentScheme))




FileLib.write(`SlayerUtils`, currentScheme, JSON.stringify(scheme, null, 4))


config
    .setPos(config.settings.x, config.settings.y)
    .setSize(config.settings.width, config.settings.height)
    
    .apply()

export function getColor(configKey) {
    const index = config.settings[configKey];
    return colors[index].slice(0,2) || "§7Unknown";
}

export default config.settings