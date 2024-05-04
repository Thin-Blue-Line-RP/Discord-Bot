import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

function initFunctions(client: Client) {
    const functionFiles = fs.readdirSync(path.join(__dirname, "functions")).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) {
        const func = require(`${path.join(__dirname, "functions")}/${file}`);
        client.functions.set(func.name, func);
    }
}

export default initFunctions;