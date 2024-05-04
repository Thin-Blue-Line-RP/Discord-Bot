import { Client, REST, Routes } from 'discord.js';
const { guildID, DISCORD_TOKEN } = process.env;
import fs from 'fs';
import path from 'path';




const initCommands = (client: Client) => {
    client.emit('log', 'info', 'Initializing Commands...');

    const commands: any = [];

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    client.emit('log', 'debug', `Folders Path: ${foldersPath}`)
    client.emit('log', 'debug', `Commands Folders: ${commandFolders}`)
    for (const folder of commandFolders) {
        client.emit('log', 'debug', `Loading commands from ${folder}`)
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            client.emit('log', 'debug', `Loading Command ${file}`)
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                if (folder === 'content-commands') {
                    client.commands.set("content-"+command.data.name, command)
                } else {
                    commands.push(command.data.toJSON());
                    client.commands.set("interaction"+command.data.name, command)
                }
            } else {
                client.emit('log', 'warn', `The command at ${filePath} does not have a "data" or "execute" property.`)
            }
        }
    }

    if (!guildID) {
        throw new Error('GUILD_ID environment variable is missing.');
    }

    if (!DISCORD_TOKEN) {
        throw new Error('DISCORD_TOKEN environment variable is missing.');
    }



    const rest = new REST().setToken(DISCORD_TOKEN);

    (async () => {
        client.emit('log', 'debug', 'Reached Command Refreshing...')
        try {
            client.emit('log', 'info',`Started refreshing ${commands.length} application (/) commands.`);
            if (!client.user) {
                throw new Error('Client user is not available.');
            }
            const data: any = await rest.put(
                Routes.applicationGuildCommands(client.user.id, guildID),
                { body: commands }
            )

            client.emit('log', 'info',`Successfully refreshed ${data.length} application (/) commands.`)
        } catch (error) {
            throw new Error(String(error))
        }
    })();
}

export default initCommands;