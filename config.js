import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { FramebufferUtils } from "../Framebuffers";
import { dataAA } from "./data.js"
import { ResetCombatXp, colors, move } from "./Features/Exports.js"
const schemes = ["data/ColorScheme.json", "data/scheme-vigil.json", "data/scheme-nwjn.json"]
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
            move()
            
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
    description: "Select A Color For The Title.",
    category: "Customization",
    shouldShow: data => data.CombatTitle,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Combat Overlay Colors [Gained XP]",
    configName: "GainedColor",
    description: "Select A Color For The Gained XP.",
    category: "Customization",
    shouldShow: data => data.CombatGained,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Combat Overlay Colors [Time Elapsed]",
    configName: "TimeColor",
    description: "Select A Color For The Time Elapsed.",
    category: "Customization",
    shouldShow: data => data.CombatTime,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Combat Overlay Colors [Rates]",
    configName: "RateColor",
    description: "Select A Color For The Rate.",
    category: "Customization",
    shouldShow: data => data.CombatRate,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Combat Overlay Colors [Values]",
    configName: "ValuesColor",
    description: "Select A Color For The Values.",
    category: "Customization",
    shouldShow: data => data.CombatValues,
    options: colors,
    value: 0,
    
})

 .addMultiCheckbox({
        category: "Customization",
        configName: "PETmultiCheckBoxTest",
        
        title: "Pet Overlay Customization",
        description: "Select Different Colors For Each Part Of The Overlay.",
        placeHolder: "Bonk", 
        options: [
            {
                title: "[Title]",
                configName: "PetTitle",
                value: false,
               
            },
            {
                title: "[Pet]",
                configName: "PetPet",
                value: false
            },
            {
                title: "[Gained]",
                configName: "PetGained",
                value: false
            },
            {
                title: "[Rate]",
                configName: "PetRate",
                value: false
            },
            {
                title: "[Values]",
                configName: "PetValues",
                value: false
            }
        ]
    })
.addDropDown({
    title: "Pet Overlay Colors [Title]",
    configName: "TitleColorp",
    description: "Select A Color For The Title.",
    category: "Customization",
    shouldShow: data => data.PetTitle,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Pet Overlay Colors [Name]",
    configName: "PetPetp",
    description: "Select A Color For The Name.",
    category: "Customization",
    shouldShow: data => data.PetPet,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Pet Overlay Colors [Gained XP]",
    configName: "PetGainedp",
    description: "Select A Color For The Gained XP.",
    category: "Customization",
    shouldShow: data => data.PetGained,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "Pet Overlay Colors [Rates]",
    configName: "RateColorp",
    description: "Select A Color For The Rate.",
    category: "Customization",
    shouldShow: data => data.PetRate,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "Pet Overlay Colors [Values]",
    configName: "ValuesColorp",
    description: "Select A Color For The Values.",
    category: "Customization",
    shouldShow: data => data.PetValues,
    options: colors,
    value: 0,
    
})

.addMultiCheckbox({
        category: "Customization",
        configName: "RNGmultiCheckBoxTest",
        
        title: "RNG Meter Overlay Customization",
        description: "Select Different Colors For Each Part Of The Overlay.",
        placeHolder: "Bonk", 
        options: [
            {
                title: "[Title]",
                configName: "RngTitle",
                value: false,
               
            },
            {
                title: "[Item]",
                configName: "RngItem",
                value: false
            },
            {
                title: "[Meter]",
                configName: "RngMeter",
                value: false
            },
            {
                title: "[Time]",
                configName: "RngTime",
                value: false
            },
            {
                title: "[PercentBar]",
                configName: "RngBar",
                value: false
            },
            {
                title: "[Values]",
                configName: "RngValues",
                value: false
            }
        ]
    })
.addDropDown({
    title: "RNG Meter Overlay Colors [Title]",
    configName: "RngTitleColor",
    description: "Select A Color For The Title.",
    category: "Customization",
    shouldShow: data => data.RngTitle,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "RNG Meter Overlay Colors [Item]",
    configName: "RngItemColor",
    description: "Select A Color For The Item.",
    category: "Customization",
    shouldShow: data => data.RngItem,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "RNG Meter Overlay Colors [Meter]",
    configName: "RngMeterColor",
    description: "Select A Color For The Meter.",
    category: "Customization",
    shouldShow: data => data.RngMeter,
    options: colors,
    value: 0,
    
})
.addDropDown({
    title: "RNG Meter Overlay Colors [Time]",
    configName: "RngTimeColor",
    description: "Select A Color For The Time.",
    category: "Customization",
    shouldShow: data => data.RngTime,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "RNG Meter Overlay Colors [PercentBar]",
    configName: "RngBarColor",
    description: "Select A Color For The Percent Bar.",
    category: "Customization",
    shouldShow: data => data.RngBar,
    options: colors,
    value: 0,
    
})

.addDropDown({
    title: "RNG Meter Overlay Colors [Values]",
    configName: "RngValuesColor",
    description: "Select A Color For The Values.",
    category: "Customization",
    shouldShow: data => data.RngValues,
    options: colors,
    value: 0,
    
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

    
    .setCommand("Gui", ["gui"])

   
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



export default config.settings