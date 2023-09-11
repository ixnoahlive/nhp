/**                                               *
 * The command queue is a system to make commands *
 *   not override the Hypixel Command Cooldown    *
 *                                               **/

import settings from "./settings"

const CommandQueue = []

register('step', () => {
    if (CommandQueue.length==0) return

    const currentCommand = CommandQueue.shift()
    ChatLib.command(currentCommand.name)
    if (settings.commandLog) ChatLib.chat(new Message(`&7The house ran &f/${currentCommand.name}&7 via NHP!&r`).setChatLineId(816140001))
}).setDelay(1)

export default CommandQueue