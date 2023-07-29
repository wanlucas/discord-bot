import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Command from './Command';
import {
	Partials,
	Collection,
	GatewayIntentBits,
	Client as DiscordClient,
} from "discord.js";
import Event from './Event';

export default class Client extends DiscordClient {
  public commands: Collection<string, Command> = new Collection();

  constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
			partials: [Partials.Channel] 
		});
	}

	public start() {
		this.registerCommands();
		this.registerEvents();
		this.login(process.env.TOKEN);
	}

	private async registerCommands() {
		const commandsPath = path.join(__dirname, "..", "Command"); 

		await Promise.all(
			fs.readdirSync(commandsPath)
		  .filter((file) => file.endsWith(".ts"))
		  .map(async (file) => {
				const { default: { name, action } } = await import(path.join(commandsPath, file));
				const command = new Command(name, action);

				this.commands.set(command.name, command);
			}));

		console.log(`Carreguei ${this.commands.size} comandos!`);
	}

	private async registerEvents() {
		const eventsPath = path.join(__dirname, "..", "Event");
 
		await Promise.all(
			fs.readdirSync(eventsPath)
		  .filter((file) => file.endsWith(".ts"))
		  .map(async (file) => {
				const { default: { name, run } } = await import(path.join(eventsPath, file));
				const event = new Event(name, run);

				this.on(event.name, event.run.bind(null, this) as any);
			}));

		console.log(`Carreguei ${this.eventNames().length - 1} eventos!`);
	}
}
