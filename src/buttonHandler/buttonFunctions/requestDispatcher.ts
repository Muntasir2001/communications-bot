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

const requestDispatcher: Button = {
	customId: 'requestDispatcher',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const options: Array<{
				label: string;
				description: string;
				value: string;
			}> = [
				{
					label: 'Primary',
					description: 'Request for Primary Dispatcher',
					value: 'primary',
				},
				{
					label: 'Secondary',
					description: 'Request for Secondary Dispatcher',
					value: 'secondary',
				},
				{
					label: '911',
					description: 'Request for 911 Operator',
					value: '911',
				},
			];

			const selectMenu = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('requestDispatcher')
					.setPlaceholder('Select Dispatch type to request for')
					.addOptions(options),
			);

			const embed = new MessageEmbed()
				.setTitle('Which Dispatch type are you requesting for?')
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
				file: 'requestDispatcher',
			});
		}
	},
};

export default requestDispatcher;
