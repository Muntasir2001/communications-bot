import {
	SelectMenuInteraction,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
} from 'discord.js';

import config from '../../../config';
import botConfig from '../../../botConfig';

export enum dispatchTypes {
	PRIMARY,
	SECONDARY,
	NINE_ONE_ONE,
}

interface props {
	interaction: SelectMenuInteraction;
	dispatchType: dispatchTypes;
}

const dispatchLogger = async (props: props) => {
	const { dispatchType, interaction } = props;

	const logChannel: any = await interaction.guild!.channels.fetch(
		config.dispatcLogChannelId,
	);

	if (logChannel) {
		const date = new Date();

		const buttons = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('disregard')
				.setLabel('Disregard/22')
				.setStyle('DANGER'),
		);

		const member = await interaction
			.guild!.members.fetch({ user: interaction.user })
			.catch((err) => {
				throw err;
			});

		const embed = new MessageEmbed()
			.setColor(botConfig.color.red)
			.setThumbnail(`${interaction.guild?.iconURL()}`)
			.addFields([
				{
					name: 'Requestor',
					value: `${member!.nickname || interaction.user.tag}`,
				},
				{
					name: 'Server',
					value: '1',
				},
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

		switch (dispatchType) {
			case dispatchTypes.PRIMARY:
				embed.setTitle('Requesting for Primary Dispatcher');
				break;
			case dispatchTypes.SECONDARY:
				embed.setTitle('Requesting for Secondary Dispatcher');
				break;
			case dispatchTypes.NINE_ONE_ONE:
				embed.setTitle('Requesting for 911 Operator');
				break;
		}

		return await logChannel.send({
			embeds: [embed],
			components: [buttons],
		});
	} else {
		return false;
	}
};

export default dispatchLogger;
