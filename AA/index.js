import {getSlayer} from "./Features/getSlayer.js";
import Stopwatch from "./Features/stopWatch.js";
import { data } from "./data.js";


ChatLib.chat(ChatLib.getChatBreak(`&a-`));
ChatLib.chat(`&6Thanks for downloading SlayerUtils`)
ChatLib.chat(ChatLib.getChatBreak(`&a-`))

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
// rev

let pbrs = 99999
let pbrk = 99999
let pbrt = 99999
let pbrtier = 0

// sven

let pbss = 99999;
let pbsk = 99999;
let pbst = 99999;
let pbstier = 0

// tara

let pbts = 99999;
let pbtk = 99999;
let pbtt = 99999;
let pbttier = 0

//  eman

let pbes = 99999;
let pbek = 99999;
let pbet = 99999;
let pbetier = 0

// inferno

let pbbs = 99999;
let pbbk = 99999;
let pbbt = 99999;
let pbbtier = 0

let personalSlayer = null
let personalTier = null

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
    
    
        if (bossRuns.length > maxRuns) bossRuns.shift();
}
 else {
            ChatLib.chat("&c[ERROR] Missing spawn or kill time!");
        }
    }
});


let lastBossUUID = null;
let specificName = null
let tier = null

const nameMap = {
    "Revenant Horror": "Zombie",
    "Tarantula Broodfather": "Tarantula",
    "Sven Packmaster": "Sven",
    "Voidgloom Seraph": "Eman",
    "Inferno DemonLord": "Blaze"
};


register("step", () => {
    World.getAllEntities().forEach(entity => {
        if (!entity || !entity.getName) return;

        const name = entity.getName().trim();
        const cleanName = name.replace(/§./g, "").trim();
        const match = name.match(/(Revenant Horror|Tarantula Broodfather|Inferno DemonLord|Voidgloom Seraph|Sven Packmaster)/);
        const tiermatch = cleanName.match(/\b(I|II|III|IV|V)\b/);
        

if (match) {
    specificName = nameMap[match[1]];

    if (tiermatch) {
        tier = tiermatch[1];
    } else {
        tier = "N/A"; // or default tier, e.g. 1
    }

     
}      if (
            name.includes("Revenant Horror") || 
            name.includes("Tarantula Broodfather") || 
            name.includes("Inferno DemonLord") || 
            name.includes("Voidgloom Seraph")
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




let numericTier = null  // rev
register("command", ()=>{
     numericTier = romanToNumber(tier);
    if (specificName == "Zombie" && (currentTotal < pbrt || numericTier > pbrtier)) {
        

if (numericTier > pbrtier){
        pbrs = currentSpawn
        pbrk = currentKill
        pbrt = currentTotal
        pbrtier = numericTier
        
        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbrs}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbrk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbrt.toFixed(2)}s`)


    }



    else if (pbrtier == numericTier && currentTotal < pbrt){
        pbrs = currentSpawn
        pbrk = currentKill
        pbrt = currentTotal
        pbrtier=numericTier
        
    

        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbrs}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbrk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbrt.toFixed(2)}s`)

}  else if (pbrtier > numericTier){
    ChatLib.chat(`&bYou've Killed a Higher Tier Slayer: &6${specificName} Tier: &6${tier}`)

}}

else if (specificName === "Zombie" && !(currentTotal < pbtt || numericTier > pbttier)){
    ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)
}

else {
    ChatLib.chat(`&6[SlayerUtils]: &bSlayer is Not Revs`)
}
}).setName("pbr").setAliases("pbrev")



register("command", ()=>{    // tara
     numericTier = romanToNumber(tier);
    if (specificName == "Tarantula" && (currentTotal < pbtt || numericTier > pbttier)) {
        

if (numericTier > pbrtier){
        pbts = currentSpawn
        pbtk = currentKill
        pbtt = currentTotal
        pbttier = numericTier
        
        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)


    }



    else if (pbttier == numericTier && currentTotal < pbtt){
        pbts = currentSpawn
        pbtk = currentKill
        pbtt = currentTotal
        pbttier=numericTier
        
    

        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)

}  else if (pbttier > numericTier){
    ChatLib.chat(`&bYou've Killed a Higher Tier Slayer: &6${specificName} Tier: &6${tier}`)

}}
else if (specificName === "Tarantula" && !(currentTotal < pbtt || numericTier > pbttier)){
    ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)

}
else {
    ChatLib.chat(`&6[SlayerUtils]: &bSlayer is Not Trantulas`)
}
}).setName("pbt").setAliases("pbtara")


register("command", ()=>{   // sven
     numericTier = romanToNumber(tier);
    if (specificName == "Sven" && (currentTotal < pbst || numericTier > pbstier)) {
        

if (numericTier > pbstier){
        pbss = currentSpawn
        pbsk = currentKill
        pbst = currentTotal
        pbstier = numericTier
        
        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbss}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbsk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbst.toFixed(2)}s`)


    }



    else if (pbstier == numericTier && currentTotal < pbst){
        pbss = currentSpawn
        pbsk = currentKill
        pbst = currentTotal
        pbstier=numericTier
        
    

        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbss}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbsk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbst.toFixed(2)}s`)

}  else if (pbstier > numericTier){
    ChatLib.chat(`&bYou've Killed a Higher Tier Slayer: &6${specificName} Tier: &6${tier}`)

}}

else if (specificName === "Sven" && !(currentTotal < pbtt || numericTier > pbttier)){
    ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)
}

else {
    ChatLib.chat(`&6[SlayerUtils]: &bSlayer is Not Svens`)
}
}).setName("pbs").setAliases("pbsven")


register("command", ()=>{    // eman
     numericTier = romanToNumber(tier);
    if (specificName == "Eman" && (currentTotal < pbet || numericTier > pbetier)) {
        

if (numericTier > pbetier){
        pbes = currentSpawn
        pbek = currentKill
        pbet = currentTotal
        pbetier = numericTier
        
        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbes}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbek}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbet.toFixed(2)}s`)


    }



    else if (pbetier == numericTier && currentTotal < pbet){
        pbes = currentSpawn
        pbek = currentKill
        pbet = currentTotal
        pbetier=numericTier
        
    

        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbes}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbek}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbet.toFixed(2)}s`)

}  else if (pbetier > numericTier){
    ChatLib.chat(`&bYou've Killed a Higher Tier Slayer: &6${specificName} Tier: &6${tier}`)

}}

else if (specificName === "Eman" && !(currentTotal < pbtt || numericTier > pbttier)){
    ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)
}
else {
    ChatLib.chat(`&6[SlayerUtils]: &bSlayer is Not Enderman`)
}
}).setName("pbe").setAliases("pbeman")

register("command", ()=>{        // blaze
     numericTier = romanToNumber(tier);
    if (specificName == "Blaze" && (currentTotal < pbbt || numericTier > pbbtier)) {
        

if (numericTier > pbbtier){
        pbbs = currentSpawn
        pbbk = currentKill
        pbbt = currentTotal
        pbbtier = numericTier
        
        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbbs}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbbk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbbt.toFixed(2)}s`)


    }



    else if (pbbtier == numericTier && currentTotal < pbbt){
        pbbs = currentSpawn
        pbbk = currentKill
        pbbt = currentTotal
        pbbtier=numericTier
        
    

        ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbbs}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbbk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbbt.toFixed(2)}s`)

}  else if (pbbtier > numericTier){
    ChatLib.chat(`&bYou've Killed a Higher Tier Slayer: &6${specificName} Tier: &6${tier}`)

}}

else if (specificName === "Blaze" && !(currentTotal < pbtt || numericTier > pbttier)){
    ChatLib.chat(`&bPersonal Bests For Slayer: &6${specificName} Tier: &6${tier}`)
        ChatLib.chat(`&bPersonal Best Spawn: &6${pbts}s`)
        ChatLib.chat(`&bPersonal Best Kill: &6${pbtk}s`)
        ChatLib.chat(`&bPersonal Best Total Time: &6${pbtt.toFixed(2)}s`)
}

else {
    ChatLib.chat(`&6[SlayerUtils]: &bSlayer is Not Blaze`)
}
}).setName("pbb").setAliases("pbblaze")

