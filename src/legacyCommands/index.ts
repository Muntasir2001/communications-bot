import { Message, Client } from 'discord.js';

const PREFIX: any = process.env.PREFIX;

import legacyCommands from './commandsList';
import { LegacyCommand } from './LegacyCommand';

const legacyCommandHandler = (message: Message, client: Client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		const legacyCommand = legacyCommands.find((c) => c.name === CMD_NAME);

		if (!legacyCommand) {
			return;
		}

		legacyCommand.run(client, message);
	}
};

export default legacyCommandHandler;
