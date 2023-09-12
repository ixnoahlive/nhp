const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus");

const EnumConverter = {
    '1':'ONE',
    '6':'SIX',
    '10':'TEN',
    '12':'TWELVE',
    '20':'TWENTY',
}

const colors = ['RED','YELLOW','GREEN','BLUE','PURPLE','PINK','WHITE']

module.exports = {
    id: 'H01',
    name: 'bossbar',
    description: 'Sets the bossbar with the given data.',
    requiredArgs: ['name'],
    args: { 
        content:'The text to show as the boss name, set to null to clear all bars',
        health: 'A number from 0-100 for the boss health',
        passive: 'Add this to add a new bossbar without removing ones with the same name (Enabling will create duplicate bossbars)'

        // color: '(1.19+) The color of the bossbar, options: red, yellow, green, blue, purple, pink, white',
        // notch: '(1.19+) The notch style of the bossbar, options: 1, 6, 10, 12, 20'
    },
    run(args) {
        BossStatus.field_82826_b = 0
        BossStatus.field_82827_c = "",
        BossStatus.field_82828_a = 1

        if (args.name == "null") return

        BossStatus.field_82827_c = args.name.addColor(); // Set the name
        if (parseFloat(args.health) || args.health=="0") BossStatus.field_82828_a = parseFloat(args.health)/100; // Amount of health percentage
        if (parseInt(args.duration)) BossStatus.field_82826_b = parseFloat(args.duration) * 60; // Set the duration if specified

        BossStatus.field_82826_b = 9999999 // itll last about 19 years 👍
    },
    runModern(args) {
        if (args.name=="null") return BossBars.clearBossBars()

        if (!args.hasOwnProperty('passive')) {
            BossBars.getBossBars().forEach(bar => {
                if (bar.getName().removeFormatting()==args.name.removeFormatting()) BossBars.removeBossBar(bar)
            })
        }

        const properties = { name: args.name, health: 1 }
        if (parseFloat(args.health) || args.health=="0")               properties.percent  = parseFloat(args.health)/100
        // if (args.color && colors.includes(args.color.toUpperCase()))   properties.color    = BossBars.Color[args.color.toUpperCase()]
        // if (EnumConverter[args.notch])                                 properties.sections = BossBars.Style[EnumConverter[args.notch]]

        BossBars.addBossBar(properties)
    }
};