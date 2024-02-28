import fs from 'fs';

import { Client, Message, MessageButton, MessageActionRow } from 'discord.js';

import { LegacyCommand } from '../LegacyCommand';
import { MessageEmbed } from 'discord.js';

const jamal: LegacyCommand = {
	name: 'dispatchpanel',
	run: async (client: Client, message: Message) => {
		try {
			const embed = new MessageEmbed()
				.setThumbnail(`${message.guild?.iconURL()}`)
				.setTitle('Server 1 Dispatch Panel')
				.setDescription('Test')
				.setFooter({ text: 'BeyondRP Communications Bureau' })
				.setTimestamp();

			const dispatchButtons = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('activatePrimary')
					.setLabel('Active as Primary')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('activateSecondary')
					.setLabel('Activate as Secondary')
					.setStyle('SECONDARY'),
			);

			const requestDispatcherButtons = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('requestDispatcher')
					.setLabel('Request Dispatcher')
					.setStyle('PRIMARY'),
			);

			return message.channel.send({
				embeds: [embed],
				components: [dispatchButtons, requestDispatcherButtons],
			});
		} catch (err) {
			try {
				fs.appendFile(
					'logs/crash_logs.txt',
					`${new Date()} : Something went wrong in legacyCommands/jamal.ts \n Actual error: ${err} \n \n`,
					(err) => {
						if (err) throw err;
					},
				);
			} catch (err) {
				console.log('Error logging failed');
			}
		}
	},
};

export default jamal;
