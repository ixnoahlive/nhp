module.exports = {
    id: 'M01',
    name: 'sound',
    description: 'Plays a sound by it\'s namespace',
    requiredArgs: ['name'],
    args: {
        name: 'The name of the sound with dots replaced by space bar (e.g. mob ghast scream)',
        modernName: 'The name of the sound on 1.20, if this is left blank the mod will use default name',
        namespace: 'The namespace of the sound on 1.20, if this is left blank it will use minecraft'

        volume: 'The volume to play the sound at (capped at 1.5)',
        pitch: 'The pitch to play the sound at (capped at 3)',
        delay: 'The time to wait before playing the sound in seconds, useful for making little melodies'
    },
    run(args) {
        const formatted = { volume: 1, pitch: 1, }

        if (parseFloat(args.volume) || args.volume=="0") formatted.volume = parseFloat(args.volume)
        if (formatted.volume>1.5) formatted.volume = 1.5
         
        if (parseFloat(args.pitch) || args.pitch=="0") formatted.pitch = parseFloat(args.pitch)
        if (formatted.pitch>3) formatted.pitch = 3

        setTimeout(() => {
            World.playSound(args.name.replace(/[ ,]/g, '.').removeFormatting(), 1, 1)
        }, parseFloat(args.delay) ? parseFloat(args.delay) * 1000 : 0);
    },
    runModern(args) {
        ChatLib.chat('&c[NHP] The Sound packet is unavailable on 1.20.')
    }
}