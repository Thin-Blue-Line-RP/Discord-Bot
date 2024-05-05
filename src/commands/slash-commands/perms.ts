import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction} from 'discord.js';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('perms')
        .setDescription('Get the permissions of a user ')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get permissions for')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser('target');
        if (!user) return interaction.reply('Please provide a user to get permissions for');
        const member = interaction.guild?.members.cache.get(user?.id);
        if (!member) return interaction.reply('User is not in this server');
        const permissions = member.permissions.toArray();
        const embed = new EmbedBuilder()
            .setTitle('Permissions')
            .setDescription(permissions.join('\n'))
            .setColor([255,65,0])
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        await interaction.reply({ embeds: [embed], ephemeral: true});
    }
}