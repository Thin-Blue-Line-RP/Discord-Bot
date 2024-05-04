import fs from 'fs';
import {Client} from 'discord.js';
import path from 'path';


function initEvents(client:Client) {
    const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`${path.join(__dirname, "events")}/${file}`);
        if (event.once) {
            client.once(event.name, (...args:any) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args:any) => event.execute(...args, client));
        }
    }
}

export default initEvents;