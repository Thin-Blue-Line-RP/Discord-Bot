import { Message } from "discord.js";

module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    async execute(message: Message) {
        await message.reply('Pong!');
    }
}