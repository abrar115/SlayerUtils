import {getSlayer} from "./Features/getSlayer.js";
import Stopwatch from "./Features/stopWatch.js";
import { data } from "./data.js";


ChatLib.chat(ChatLib.getChatBreak(`§a-`));
ChatLib.chat(`&6Thanks for downloading SlayerUtils`)
ChatLib.chat(ChatLib.getChatBreak(`&a-`))


const weird = `⣿⣿⡟⢁⣶⣿⣿⣿⣿⣿⣿⣷⣦⣭⣛⡻⠿⣿⣏⠙⢭⣭⣭⣭⣭⣛⣛⡻⠿⢿⣿⠿⢛⣫⣭⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣇⠈⣿`
const weird1 = `⣿⣿⠄⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠂⠨⠭⠤⠬⠽⠿⢿⣿⣿⣿⣿⣷⣦⣤⣝⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⣿`
const weird2 = `⣿⣿⡄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣠⣿`
const weird3 = `⠿⠿⠿⠷⢬⡛⠿⣿⣯⠍⣩⣭⣭⣭⠉⠉⠉⠉⠉⢉⣿⣿⣿⣿⣿⣿⣿⡏⠄⠄⠄⠄⠄⢰⣶⣶⣆⠐⣾⣿⠿⠿⠛⠋⠵⠶⠿⣿`
const weird4 = `⣷⣬⣐⣒⡲⢶⣶⣾⠿⢄⣻⣿⣿⣿⣦⣀⣀⣀⣠⣾⣟⣛⣛⣛⣿⣿⣿⣷⣤⣄⣀⣤⣴⣾⣿⠿⢿⡀⢿⣿⣿⡿⠛⣋⣭⣴⣾⣿`
const weird5 = `⣿⣿⠟⠋⠤⠿⠿⠿⠧⠴⣶⣿⣿⣿⣿⣿⣿⣿⣟⣛⣛⣛⣉⣭⣍⣙⣋⣩⣥⣽⣿⣿⣿⣿⣿⣧⡶⠿⠿⠿⠿⠿⠿⠤⣘⣛⣿⣿`
const weird6 = `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣦⣌⡉⠩⢭⣭⣭⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡐⠶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`
const weird7 = `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣉⣐⠒⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣌⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`


const lines = [weird, weird1, weird2, weird3, weird4, weird5, weird6, weird7];

register("command", () => {
    lines.forEach((line, i) => {
        setTimeout(() => {
            ChatLib.say(`/pc ${line}`);
        }, i * 500); // 500 ms delay between messages
    });
}).setName("hi");

function romanToNumber(roman) {
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5 };
    return map[roman] || 0;
}

const slayerMap = {
    "⏣ Coal Mine🐍": "Zombie",
    "⏣ Graveyard🐍": "Zombie",
    "⏣ Arachne's Burrow": "Spider",
    "⏣ Arachne's Sanctuary": "Spider",
    "⏣ Spiders Den": "Spider",
    "⏣ Spider Mound": "Spider",
    "⏣ Ruins🐍": "Sven",
    "⏣ Howling C🐍ave": "Sven",
    "⏣ The End🐍": "Enderman",
    "⏣ Void Sepu🐍lture": "Enderman",
    "⏣ Zealot Br🐍uiser Hideout": "Enderman",
    "⏣ Dragon's 🐍Nest": "Enderman",
    "⏣ Smolderin🐍g Tomb": "Blaze",
    "⏣ Stronghol🐍d": "Blaze",
    "⏣ The Waste🐍land": "Blaze",
    "ф Stillgore Château": "Vampire",
    
};




function getArea() {
    const lines = Scoreboard.getLines();

    const line = lines.find(l =>
        l.getName().removeFormatting().includes("⏣") ||
        l.getName().removeFormatting().includes("ф")
    );

    if (!line) return null; // No valid area found, return null

    const raw = line.getName().removeFormatting().trim();
    const cleaned = raw.replace(/\s+/g, " ").trim();

    return cleaned;
}

export function getSlayer() {
    const area = getArea();
    if (!area) return null; 

    const slayer = slayerMap[area];
    return slayer || null; 
}




let hasEnteredSlayerArea = false; 
register("step", () => {
    const area = getArea();
   
    if (area && !hasEnteredSlayerArea) {
       
        hasEnteredSlayerArea = true;
    }

   
    else if (!area && hasEnteredSlayerArea) {
        
        hasEnteredSlayerArea = false; 
    }
}).setDelay(2); 

register("step", () => {
    const currentSlayer = getSlayer(); 
   
    if (currentSlayer) {
       
    }
}).setDelay(2); 

let lastValue = null;


register("step", (x) => {
    let x = getArea()
    if (x in slayerMap && x !== lastValue){
        lastValue = x
        ChatLib.chat("§6You have entered: " + "§b" + x)

    }
    else {
      
    }

  
}).setDelay(2);


let timer1 = null;   // quest start
let timer3 = null;   // boss spawn
let timer2 = null;   // quest complete
let spawnSeconds = null;
let seconds = null;
let bossTime = null;
let currentSpawn = null
let currentKill = null
let currentTotal = null

const maxRuns = 5
const bossRuns = []
let lastBossUUID = null;
let specificName = null
let tier = null

const nameMap = {
    "Revenant Horror": "Zombie",
    "Tarantula Broodfather": "Tarantula",
    "Sven Packmaster": "Sven",
    "Voidgloom Seraph": "Eman",
    "Inferno Demonlord": "Blaze"
};



register("step", () => {
    World.getAllEntities().forEach(entity => {
        if (!entity || !entity.getName) return;

        const name = entity.getName().trim();
        const cleanName = name.replace(/§./g, "").trim();
        const match = name.match(/(Revenant Horror|Tarantula Broodfather|Inferno Demonlord|Voidgloom Seraph|Sven Packmaster)/);
        const tiermatch = cleanName.match(/\b(I|II|III|IV|V)\b/);


if (match) {
    specificName = nameMap[match[1]];

    if (tiermatch) {
        tier = tiermatch[1];
    } else {
        tier = "N/A"; // or default tier, e.g. 1
    }

     
}      if (
            cleanName.includes("Revenant Horror") || 
            cleanName.includes("Tarantula Broodfather") || 
            cleanName.includes("Inferno Demonlord") || 
            cleanName.includes("Voidgloom Seraph")
        ) { 
            const uuid = entity.getUUID();

            if (uuid === lastBossUUID) return; // Already detected

            lastBossUUID = uuid;

            if (timer1 !== null) { // Only set spawn if quest started
                timer3 = Date.now();
            }
        }
    });
}).setFps(2);




register("chat", (event) => {
    const msg = ChatLib.getChatMessage(event).trim();

    if (msg === "SLAYER QUEST STARTED!") {
        timer1 = Date.now();  // Start quest timer
        spawnSeconds = null;
        seconds = null;
        bossTime = null;
        timer3 = null;  // reset boss spawn time
    }

    if (msg === "SLAYER QUEST COMPLETE!") {
        
        if (timer1 !== null && timer3 !== null) {
            timer2 = Date.now(); // Quest completion time

            // Kill time = quest complete - boss spawn
            seconds = ((timer2 - timer3) / 1000).toFixed(2);

            // Spawn time = boss spawn - quest start
            spawnSeconds = ((timer3 - timer1) / 1000).toFixed(2);

            // Total time = quest complete - quest start
            bossTime = ((timer2 - timer1) / 1000).toFixed(2);

            ChatLib.chat(`&6Spawn Time: &b${spawnSeconds}s`);
            ChatLib.chat(`&6Kill Time: &b${seconds}s`);
            ChatLib.chat(`&6Boss Total Time: &b${bossTime}s`);

            // Update personal best only if times are valid numbers
            if (!isNaN(spawnSeconds) && !isNaN(seconds)) {
                 currentSpawn = parseFloat(spawnSeconds); 
                 currentKill = parseFloat(seconds);
                 currentTotal = parseFloat(bossTime);

                

                // Save the run etc. (if you want)
            }

            timer1 = null; // reset quest start for next run
            timer3 = null; // reset spawn for next run
        } else {
            ChatLib.chat("&cSLAYER QUEST COMPLETE! But no start or spawn time recorded.");
        }

        if (spawnSeconds !== null && seconds !== null) {    // 2nd if for putting numbers into bossruns for avt
            

    currentSpawn = parseFloat(spawnSeconds);
    currentKill = parseFloat(seconds);
    currentTotal = (currentSpawn + currentKill)

    bossRuns.push({
        "Slayer": specificName,
        "Tier": tier,
        "Spawn": currentSpawn,
        "Kill": currentKill,
        "Total": currentTotal
        
    });
    ChatLib.chat(specificName)
    
        if (bossRuns.length > maxRuns) bossRuns.shift();
}
 else {
            ChatLib.chat("&c[ERROR] Missing spawn or kill time!");
        }
    }
});






register("command", () => {
    if (!bossRuns.length) {
        ChatLib.chat("&cNo boss runs recorded yet.");
        return;
    }

    ChatLib.chat("&6Last 5 boss runs:");
bossRuns.forEach((run, i) => {
    ChatLib.chat(`&e#${i + 1}: &eSlayer: &6${run.Slayer} &eTier: &6${run.Tier} &eSpawn: &6${run.Spawn}s &eKill: &6${run.Kill}s &eTotal: &6${run.Total.toFixed(2)}s`);
})
}).setName("avgtimes").setAliases("avt");




register("command", ()=>{
numericTier = romanToNumber(tier);
if (specificName == "Zombie" && (currentTotal < data.rev.total || numericTier > data.rev.tier)) {
       data.rev.name = specificName

if (numericTier > data.rev.tier){
        
        data.rev.spawn = currentSpawn
        data.rev.kill = currentKill
        data.rev.total = currentTotal
        data.rev.tier = numericTier
         ChatLib.chat(ChatLib.getChatBreak(`&f-`))
       ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.rev.name} T${data.rev.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bersonal Best Data remember: &5${data.rev.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
    }



    else if (data.rev.tier == numericTier && currentTotal < data.rev.total){
       
        data.rev.spawn = currentSpawn
        data.rev.kill = currentKill
        data.rev.total = currentTotal
        data.rev.tier = numericTier
         ChatLib.chat(ChatLib.getChatBreak(`&f-`))
       ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.rev.name} T${data.rev.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bersonal Best Data remember: &5${data.rev.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}}
else {
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.rev.name} T${data.rev.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bersonal Best Data remember: &5${data.rev.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.rev.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}
}).setName("pbr").setAliases("pbrev")





register("command", ()=>{
numericTier = romanToNumber(tier);
if (specificName == "Sven" && (currentTotal < data.sven.total || numericTier > data.sven.tier)) {
       data.rev.name = specificName

if (numericTier > data.sven.tier){
        
        data.sven.spawn = currentSpawn
        data.sven.kill = currentKill
        data.sven.total = currentTotal
        data.sven.tier = numericTier
        
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.sven.name} T${data.sven.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
    }



    else if (data.sven.tier == numericTier && currentTotal < data.sven.total){
        data.sven.spawn = currentSpawn
        data.sven.kill = currentKill
        data.sven.total = currentTotal
        data.sven.tier = numericTier
        
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.sven.name} T${data.sven.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}}
else {
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.sven.name} T${data.sven.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.sven.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}
}).setName("pbs").setAliases("pbsven")





register("command", ()=>{
numericTier = romanToNumber(tier);
if (specificName == "Eman" && (currentTotal < data.eman.total || numericTier > data.eman.tier)) {
       data.eman.name = specificName

if (numericTier > data.eman.tier){
        
        data.eman.spawn = currentSpawn
        data.eman.kill = currentKill
        data.eman.total = currentTotal
        data.eman.tier = numericTier
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
         ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.eman.name} T${data.eman.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
    }



    else if (data.eman.tier == numericTier && currentTotal < data.eman.total){
       
        data.eman.spawn = currentSpawn
        data.eman.kill = currentKill
        data.eman.total = currentTotal
        data.eman.tier = numericTier
         ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.eman.name} T${data.eman.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        
}}
else {
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.eman.name} T${data.eman.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.eman.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}
}).setName("pbe").setAliases("pbeman")
register("command", ()=>{
numericTier = romanToNumber(tier);
if (specificName == "Blaze" && (currentTotal < data.blaze.total || numericTier > data.blaze.tier)) {
       data.blaze.name = specificName

if (numericTier > data.blaze.tier){
        
        data.blaze.spawn = currentSpawn
        data.blaze.kill = currentKill
        data.blaze.total = currentTotal
        data.blaze.tier = numericTier
       ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.blaze.name} T${data.blaze.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
    }



    else if (data.blaze.tier == numericTier && currentTotal < data.blaze.total){
       
        data.blaze.spawn = currentSpawn
        data.blaze.kill = currentKill
        data.blaze.total = currentTotal
        data.blaze.tier = numericTier
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
         ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.blaze.name} T${data.blaze.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        
}}
else {
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
         ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.blaze.name} T${data.blaze.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.blaze.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
}
}).setName("pbb").setAliases("pbblaze")


register("command", ()=>{
numericTier = romanToNumber(tier);
if (specificName == "Tarantula" && (currentTotal < data.tara.total || numericTier > data.tara.tier)) {
       data.tara.name = specificName

if (numericTier > data.tara.tier){
        
        data.tara.spawn = currentSpawn
        data.tara.kill = currentKill
        data.tara.total = currentTotal
        data.tara.tier = numericTier
        ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        CChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.tara.name} T${data.tara.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`§f-`))
    }



    else if (data.tara.tier == numericTier && currentTotal < data.tara.total){
       
        data.tara.spawn = currentSpawn
        data.tara.kill = currentKill
        data.tara.total = currentTotal
        data.tara.tier = numericTier
       ChatLib.chat(ChatLib.getChatBreak(`&f-`))
       ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.tara.name} T${data.tara.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`§f-`))
        
}}
else {
       ChatLib.chat(ChatLib.getChatBreak(`&f-`))
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember for: &5${data.tara.name} T${data.tara.tier}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.spawn}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.kill}`)
        ChatLib.chat(`&6[SlayerUtils]: &bPersonal Best Data remember: &5${data.tara.total}`)
        ChatLib.chat(ChatLib.getChatBreak(`§f-`))
}}).setName("pbt").setAliases("pbtara")