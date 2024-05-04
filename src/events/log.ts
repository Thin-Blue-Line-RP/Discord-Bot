import { Client } from "discord.js";

module.exports = {
    name: 'log',
    once: false,
    execute(type: String, message: String, client: Client) {
        switch (type) {
            case 'info':
                console.log(`[INFO] ${message}`);
                break;
            case 'warn':
                console.log(`[WARN] ${message}`);
                break;
            case 'error':
                console.log(`[ERROR] ${message}`);
                break;
            case 'debug':
                if (client.debug) console.log(`[DEBUG] ${message}`);
                break;
            default:
                console.log(`[INFO] ${message}`);
        }

    }
}