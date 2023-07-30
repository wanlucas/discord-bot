import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Player from './Player';
import Command from './Command';
import Event from './Event';
import {
	Partials,
	Collection,
	GatewayIntentBits,
	Client as DiscordClient,
} from "discord.js";

export default class Client extends DiscordClient {
  public commands: Collection<string, Command> = new Collection();
	public player = new Player(this);

  constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildVoiceStates,
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

		console.log(`${this.commands.size} commands loaded!`);
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

		console.log(`${this.eventNames().length - 1} events loaded!`);
	}
}
