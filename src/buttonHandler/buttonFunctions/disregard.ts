import { Client, ButtonInteraction, MessageEmbed } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import botConfig from '../../botConfig';

const disregard: Button = {
	customId: 'disregard',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const date = new Date();

			const dipstachEmbed = interaction.message?.embeds[0];
			const footer: string | any =
				interaction.message.embeds[0].footer?.text;

			if (!footer.includes(interaction.user.tag)) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':x: Only the current dispatcher/operator can use this button!',
							type: types.ERROR,
						}),
					],
					ephemeral: true,
				});
			}

			const embed = new MessageEmbed()
				.setColor(botConfig.color.red)
				.setTitle(':x: Disregard/22')
				.addFields([
					{
						name: 'Zulu Time',
						value: `\`${
							date.getUTCDate().toString().length === 1
								? '0' + date.getUTCDate().toString()
								: date.getUTCDate()
						}/${
							date.getUTCMonth().toString().length === 1
								? '0' + date.getUTCMonth().toString()
								: date.getUTCMonth()
						}/${
							date.getUTCFullYear().toString().length === 1
								? '0' + date.getUTCFullYear().toString()
								: date.getUTCFullYear()
						} ${
							date.getUTCHours().toString().length === 1
								? '0' + date.getUTCHours().toString()
								: date.getUTCHours()
						}:${
							date.getUTCMinutes().toString().length === 1
								? '0' + date.getUTCMinutes().toString()
								: date.getUTCMinutes()
						}\``,
					},
				])
				.setFooter({
					text: `User: ${interaction.user.tag} • BeyondRP Communications`,
				})
				.setTimestamp();

			await interaction.update({
				content: "Disregarded/22'ed",
				embeds: [dipstachEmbed, embed],
				components: [],
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
				file: 'disregard',
			});
		}
	},
};

export default disregard;
