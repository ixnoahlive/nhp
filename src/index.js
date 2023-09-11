import settings from "./settings"
import CommandQueue from "./queue"

let Registry = {}
let Modules = {}


// Load NHP in
function loadNHP(quiet = false) {
    Registry = JSON.parse( FileLib.read( 'nhp', 'registry.json' ) )
    
    Object.keys(Registry).forEach(id => {
        Modules[id] = require(`./packets/${Registry[id]}.js`)
    })

}; loadNHP(true)


const PAYLOAD_REGEX = new RegExp('([0-9a-z][0-9a-z])')
// Parser
register('chat', (message, event) => {
    cancel(event)

    const id = PAYLOAD_REGEX.exec(message)[0]
    if (Modules[id]) {
        let args = message.split(' ')
        
        args.shift()
        args = args.join(' ').split('␞')

        if (args[0]) {
            const argsObj = {}
            args.forEach(argument => {
                const argName = argument.split('=', 1)
                const argData = argument.split('=')
                argData.shift()
                argsObj[argName] = argData.join('=')
            })
            Modules[id].run(argsObj)
        } else Modules[id].run(null)
    }
}).setCriteria( /&r&7\* &r&f&n&r&0&r&r(.*)&r/ ) // - &r&7* &r&f&n&r&0&r&r00&r


// Main management command
register('command', (subcommand, ...args) => {
    switch (subcommand) {
        case 'reload':
            reloadNHP()
        break;

        case 'config':
            settings.openGUI()
        break;

        default:
            ChatLib.chat('&cUsage: /nhp <config/reload>')
        break;
    }
}).setName('nhp')

export { Registry, Modules }