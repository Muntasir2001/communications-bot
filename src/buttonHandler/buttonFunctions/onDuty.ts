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

const onDuty: Button = {
	customId: 'onDuty',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const options: Array<{
				label: string;
				description: string;
				value: string;
			}> = [
				{
					label: 'Primary',
					description: 'Activate as Primary Dispatcher',
					value: 'primary',
				},
				{
					label: 'Secondary',
					description: 'Activate as Secondary Dispatcher',
					value: 'secondary',
				},
				{
					label: '911',
					description: 'Activate as 911 Operator',
					value: '911',
				},
			];

			const selectMenu = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('onDuty')
					.setPlaceholder('Select dispatch type to activate as')
					.addOptions(options),
			);

			const embed = new MessageEmbed()
				.setTitle('What are you going to activate as?')
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
				file: 'onDuty',
			});
		}
	},
};

export default onDuty;
