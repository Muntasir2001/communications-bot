import { Command } from './Command';
import botInfo from './commands/botInfo';
import dispatchPanel from './commands/dispatchPanel';

const slashCommandsList: Command[] = [botInfo, dispatchPanel];

export default slashCommandsList;
