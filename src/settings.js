import { @Vigilant, @SwitchProperty } from 'Vigilance';

@Vigilant("nhp", "NHP Config :3")
class Settings {
    @SwitchProperty({
        name: 'Show command log',
        description: 'Shows when NHP runs a command in chat',
        category: 'General',
        subcategory: 'General'
    })
    commandLog = true

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();