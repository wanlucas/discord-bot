
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: 'stop',
  aliases: ['para'],
  action: (client: Client, message: Message) => {
    const queue = client.player.nodes.get(message.guildId!);

    if (!queue) return message.reply('Parar o que?');

    queue.delete();

    return message.react('😶');
  }
});