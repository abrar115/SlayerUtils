const slayerMap = {
    "⏣ Coal Mine": "Zombie",
    "⏣ Graveyard": "Zombie",
    "⏣ Arachne's Burrow": "Spider",
    "⏣ Arachne's Sanctuary": "Spider",
    "⏣ Spiders Den": "Spider",
    "⏣ Spider Mound": "Spider",
    "⏣ Ruins": "Sven",
    "⏣ Howling Cave": "Sven",
    "⏣ The End": "Enderman",
    "⏣ Void Sepulture": "Enderman",
    "⏣ Zealot Bruiser Hideout": "Enderman",
    "⏣ Dragons Nest": "Enderman",
    "⏣ Smoldering Tomb": "Blaze",
    "⏣ Stronghold": "Blaze",
    "⏣ The Wasteland": "Blaze",
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


