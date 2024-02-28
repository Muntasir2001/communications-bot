require('dotenv').config();
import { Client, Intents, Constants, Message } from 'discord.js';

import slashCommandsList from './slashCommands/slashCommandsList';
import interactionCreate from './listeners/interactionCreate';
import legacyCommandHandler from './legacyCommands';

const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
	],
});

client.on('ready', async () => {
	if (!client.user || !client.application) {
		return;
	}

	const guildId: string | any = process.env.GUILD_ID;
	const guild = client.guilds.cache.get(guildId);
	let commands;

	if (guild && guildId != undefined) {
		commands = guild.commands;
	} else {
		commands = client.application.commands;
	}

	client.on('messageCreate', (message: Message) =>
		legacyCommandHandler(message, client),
	);

	await commands.set(slashCommandsList);

	console.log(`${client.user!.tag} has logged in BEEP BEEP 🤖`);

	// set bot status
	client.user.setPresence({
		activities: [{ name: `911`, type: 'WATCHING' }],
	});

	// run every 6 hours again to make sure it stays visible
	setInterval(() => {
		client.user?.setPresence({
			activities: [{ name: `911`, type: 'WATCHING' }],
		});
	}, 1000 * 60 * 360);
});

interactionCreate(client);

client.login(process.env.DISCORDJS_BOT_TOKEN);

export default client;
