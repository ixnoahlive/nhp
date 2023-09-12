import settings from "./settings"
import CommandQueue from "./queue"

let Registry = {}
let Modules = {}

let RegistryFlip = {} // Inverted version of registry where name leads to id

const modern = Client.getVersion()!=="1.8.9"

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

// Parser
register('chat', (message, event) => {
    cancel(event)

    const id = message.slice(2).split(' ')[0]
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

            let aborted = false
        
            // Prevent malformed packets from running
            Modules[id].requiredArgs.forEach(argName => {
                if (!argsObj[argName]) aborted = true
            })

            if (aborted) return console.log('[NHP] Attempted to run a packet with missing arguments!')
            if (modern) return Modules[id].runModern(argsObj)
            Modules[id].run(argsObj) 
        } else { 
            if (Modules[id].requiredArgs.length>0) return console.log('[NHP] Attempted to run a packet with missing arguments!')
            if (modern) return Modules[id].runModern(null)
            Modules[id].run(null) 
        }
    }
}).setCriteria( /&r&7\* &r(.*)/ )


// Main management command
register('command', (subcommand, ...args) => {
    switch (subcommand) {
        case 'reload':
            loadNHP()
        break;

        case 'b':
        case 'build':
            const id = RegistryFlip[args[0]]
            if (!id) return ChatLib.chat('&cInvalid packet name! (it\'s cAsE sEnSiTiVe)')

            args.shift()
            //     The packet id \/    \/ The parameters/args
            ChatLib.say(`${id} ${args.join(' ').replace(/ \| /g, '&r␞')}`)
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