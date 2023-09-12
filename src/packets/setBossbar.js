const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus");

module.exports = {
    id: 'H01',
    name: 'setBossbar',
    description: 'Sets the bossbar with the given data. Set the content field to "null" if you wish to clear the bossbar.',
    requiredArgs: ['content'],
    run(args) {
        BossStatus.field_82826_b = 0
        BossStatus.field_82827_c = "",
        BossStatus.field_82828_a = 1

        if (args.content == "null") return

        BossStatus.field_82827_c = args.content.addColor(); // Set the name
        if (parseFloat(args.health) || args.health=="0") BossStatus.field_82828_a = parseFloat(args.health)/100; // Amount of health percentage
        if (parseInt(args.duration)) BossStatus.field_82826_b = parseFloat(args.duration) * 60; // Set the duration if specified

        if (!parseInt(args.duration)) BossStatus.field_82826_b = 10 * 60
    },
    runModern(args) {
        
    }
};