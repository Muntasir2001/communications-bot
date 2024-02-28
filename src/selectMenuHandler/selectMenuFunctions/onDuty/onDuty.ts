import { Client, SelectMenuInteraction } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import logFile from '../../../globalUtilities/logFile';
import { SelectMenu } from '../../SelectMenu';

import dispatchLogger, { dispatchTypes } from './dispatchLogger';

const onDuty: SelectMenu = {
	customId: 'onDuty',
	run: async (client: Client, interaction: SelectMenuInteraction) => {
		try {
			const dispatchType = interaction.values[0];

			if (dispatchType === 'primary') {
				await dispatchLogger({
					dispatchType: dispatchTypes.PRIMARY,
					interaction: interaction,
				});
			} else if (dispatchType === 'secondary') {
				await dispatchLogger({
					dispatchType: dispatchTypes.SECONDARY,
					interaction: interaction,
				});
			} else if (dispatchType === '911') {
				await dispatchLogger({
					dispatchType: dispatchTypes.NINE_ONE_ONE,
					interaction: interaction,
				});
			}

			return await interaction.update({
				embeds: [
					infoMessageEmbed({
						title: `:white_check_mark: Activated as ${dispatchType} ${
							dispatchType === '911' ? 'Operator' : 'Dispatcher'
						}`,
						type: types.SUCCESS,
					}),
				],
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
				folder: 'selectMenuHandler',
				file: 'onDuty',
			});
		}
	},
};

export default onDuty;
