module.exports = {
    id: '00',
    name: 'coolThing',
    description: 'Does a cool thing',
    run(args) {
        if (!args) return ChatLib.chat('bruh!')
        console.log(args.test)
    }
}