import { Client, Message } from 'discord.js';

export interface LegacyCommand {
	name: string;
	run: (
		client: Client,
		message: Message,
		CMD_NAME?: string,
		args?: [any],
	) => void;
}
