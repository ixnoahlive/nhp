const { default: CommandQueue } = require("../queue")

const DEV_MAXVISIBILITY = 100

module.exports = {
    id: 'C01',
    name: 'visibility',
    description: 'Sets the players visibility, or recommends it if disabled',
    requiredArgs: ['amount'],
    args: { amount: 'The amount of players to show' },
    run(args) {
        if (!parseInt(args.amount)) {if (args.amount=="0") return}
        CommandQueue.push({ name: `visibility ${parseInt(args.amount)}` })
    },
    runModern(args) {this.run(args)}
}