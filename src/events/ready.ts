import { Client } from "discord.js";
import initCommands from "../initCommands";

module.exports = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        client.emit('info', 'Connected to Discord.');
        if (client.user) {
            client.emit('log', 'info', `Logged in as ${client.user.tag}`)
            initCommands(client);
        }
    }
}