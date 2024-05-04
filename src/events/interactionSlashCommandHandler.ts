import { Client, Interaction } from "discord.js";

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction: Interaction, client: Client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get("interaction"+interaction.commandName);

        if (!command) return ;
        client.emit('log', 'debug', `Executing command ${command.data.name} from ${interaction.user?.tag} in ${interaction.guild?.name}.`)
        try {
            command.execute(interaction, client);
        } catch (error) {
            client.emit('log', 'error', String(error), client);
            if (interaction.replied) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}