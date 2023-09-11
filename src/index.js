import settings from "./settings"
import CommandQueue from "./queue"

let Registry = {}
let Modules = {}

let RegistryFlip = {} // Inverted version of registry where name leads to id

// Load NHP in
function loadNHP(quiet = false) {
    Registry = JSON.parse( FileLib.read( 'nhp', 'registry.json' ) )

    Object.keys(Registry).forEach(id => {
        Modules[id] = require(`./packets/${Registry[id]}.js`)
    })

    RegistryFlip = {}
    Object.keys(Registry).forEach(key => {
        RegistryFlip[Registry[key]] = key;
    });

    if (!quiet) ChatLib.chat('&aReloaded NHP successfully!') 

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

            // Prevent malformed packets from running
            Modules[id].requiredArgs.forEach(argName => {
                if (!argsObj[argName]) return console.log('[NHP] Attempted to run a packet with missing arguments!')
            })

            Modules[id].run(argsObj)
        } else Modules[id].run(null)
    }
}).setCriteria( /&r&7\* &r&f&n&r&0&r&r(.*)&r/ ) // - &r&7* &r&f&n&r&0&r&r00&r


// Main management command
register('command', (subcommand, ...args) => {
    switch (subcommand) {
        case 'reload':
            loadNHP()
        break;

        case 'b':
        case 'build':
            const id = RegistryFlip[args[0]]
            args.shift()
            //     The packet id \/    \/ The parameters/args
            ChatLib.say(`&n&0&r${id} ${args.join(' ').replace(/ \| /g, '␞')}`)
        break;

        case 'config':
            settings.openGUI()
        break;

        default:
            ChatLib.chat('&cUsage: /nhp <build/config/reload>')
        break;
    }
}).setName('nhp')

export { Registry, Modules }