import { Events, Message } from "discord.js"
import Client from "../Entity/Client"
import Event from "../Entity/Event"

export default new Event(
  Events.MessageCreate,
  (client: Client, message: Message) => {
    const prefix = '!';
  
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    if (commandName && client.commands.has(commandName)) {
      const command = client.commands.get(commandName);
      
      try {
        command!.action(client, message, args);
      } catch (error) {
        console.error(error);
        message.reply('Ocorreu um erro ao executar esse comando!');
      }
    };
  }
);