import { Client, Message } from "discord.js";


module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message: Message, client: Client) {
        if (message.author.bot) return;
        if (!process.env.PREFIX) {
            client.emit('log', 'warn', `Prefix is not set in the environment variables. So the bot will not respond to message context commands.`);
            return;
        }
        if (process.env.PREFIX && !message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const command = client.commands.get("content-"+args.shift()?.toLowerCase()!);
        if (!command) return;
        client.emit('log', 'debug', `Executing command ${command.data.name} from ${message.author.tag} in ${message.guild?.name}.`)
        try {
            command.execute(message, client);
        } catch (error) {
            client.emit('log', 'error', String(error), client);
            await message.reply('There was an error while executing this command!');
        }


    }
}