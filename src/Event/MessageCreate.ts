import { Events, Message } from "discord.js"
import CommandError from "../Error/CommandError";
import { Client, Event } from "../Entity";

export default new Event(
  Events.MessageCreate,
  async (client: Client, message: Message) => {
    const prefix = '!';
  
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();
    
    if (commandName) {  
      const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases.includes(commandName));
    
      if (command) {   
        try {
          await command.action(client, message, args);
        } catch (error: any) {
          message.reply('Não posso fazer isso agora!');
          console.log(error);
          console.log(CommandError.register(error?.message, message.content));
        }
      } else message.reply('Como é, amigo?');
    };
  }
);