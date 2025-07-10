import { HudManager } from '../../tska/gui/HudManager.js'
import { LocalStore } from '../../tska/storage/LocalStore.js'

import { state } from './variables.js'

const prefix1 = `&6[SlayerUtils]`
export function ResetCombatXp(){
        const item = Player.getHeldItem()
    if (!item) {
        ChatLib.chat(`${prefix1} §cHold a Champion weapon to reset tracker.`)
        return
    }

    const nbt = item.getNBT()?.toObject()
    const xp = nbt?.tag?.ExtraAttributes?.champion_combat_xp

    if (xp === undefined) {
         ChatLib.chat(`${prefix1} §b&lNo Champion Found On This Weapon.`)
        return
    }

  state.tracking = false
state.startXP = xp
state.lastXP = xp
state.lastKnownXP = xp
state.startTime = 0
state.seenInitialXP = false
    
    ChatLib.chat(`${prefix1} §b&lChampion XP tracker reset `)
   
}
export const HudData = new LocalStore('SlayerUtils', {})
export const huds = new HudManager(HudData)

export const colors = ["§0Black", "§1Dark Blue", "§2Dark Green", "§3Dark Aqua", "§4Dark Red", "§5Dark Purple", "§6Gold", "§7Gray", "§8Dark Gray", "§9Blue", "§aGreen", "§bAqua", "§cRed", "§dLight Purple", "§eYellow", "§fWhite"]

export const Average = {
  Name: null,
  Tier: null,
  Spawn: null,
  Kill: null,
  Total: null,
  Bosses: 0
}

export function move(){
  huds.open()
}






