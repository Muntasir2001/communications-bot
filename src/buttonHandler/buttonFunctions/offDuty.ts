import {
	Client,
	ButtonInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import botConfig from '../../botConfig';

const offDuty: Button = {
	customId: 'offDuty',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const options: Array<{
				label: string;
				description: string;
				value: string;
			}> = [
				{
					label: 'Primary',
					description: 'Deactivate as Primary Dispatcher',
					value: 'primary',
				},
				{
					label: 'Secondary',
					description: 'Deactivate as Secondary Dispatcher',
					value: 'secondary',
				},
				{
					label: '911',
					description: 'Deactivate as 911 Operator',
					value: '911',
				},
			];

			const selectMenu = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('offDuty')
					.setPlaceholder('Select dispatch type to deactivate as')
					.addOptions(options),
			);

			const embed = new MessageEmbed()
				.setTitle('What are you going to deactivate as?')
				.setColor(botConfig.color.default)
				.setFooter({ text: `User: ${interaction.user.tag}` })
				.setTimestamp();

			return await interaction.reply({
				embeds: [embed],
				ephemeral: true,
				components: [selectMenu],
			});
		} catch (err) {
			await interaction.reply({
				embeds: [
					infoMessageEmbed({
						title: ':x: Something went wrong',
						type: types.ERROR,
					}),
				],
				ephemeral: true,
			});

			logFile({
				error: err,
				folder: 'buttonHandler',
				file: 'offDuty',
			});
		}
	},
};

export default offDuty;
