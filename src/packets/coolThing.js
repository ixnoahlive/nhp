module.exports = {
    id: '00',
    name: 'coolThing',
    description: 'Does a cool thing',
    requiredArgs: ['test'],
    run(args) {
        if (!args) return ChatLib.chat('bruh!')
        console.log(JSON.stringify(args))
    }
}