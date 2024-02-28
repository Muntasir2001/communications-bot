import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
} from 'discord.js';

import logFile from '../../globalUtilities/logFile';
import { Command } from '../Command';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';

const dispatchPanel: Command = {
	name: 'disptachpanel',
	description: 'Share dispatch panel',

	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setThumbnail(`${interaction.guild?.iconURL()}`)
				.setDescription(
					'## Server 1 Dispatch Panel\n- **On Duty:** Go on duty as a Dispatcher/Operator.\n- **Off Duty:** Go off duty.\n- **Request Dispatcher/Operator:** Request dispatcher/operator to take over.',
				)
				.setFooter({ text: 'BeyondRP Communications Bureau' })
				.setTimestamp();

			const buttons = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('onDuty')
					.setLabel('On Duty')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('offDuty')
					.setLabel('Off Duty')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('requestDispatcher')
					.setLabel('Request Dispatcher')
					.setStyle('PRIMARY'),
			);

			await interaction.channel!.send({
				embeds: [embed],
				components: [buttons],
			});

			return await interaction.reply({
				embeds: [
					infoMessageEmbed({
						title: ':white_check_mark: Dispatch panel posted!',
						type: types.SUCCESS,
					}),
				],
				ephemeral: true,
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
				folder: 'slashCommands',
				file: 'avatar',
			});
		}
	},
};

export default dispatchPanel;
