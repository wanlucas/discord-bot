
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: 'skip',
  aliases: ['pula', 'passa', 'next'],
  action: (client: Client, message: Message) => {
    const queue = client.player.nodes.get(message.guildId!);

    if (!queue) return message.reply('Pular o que?');

    queue.node.skip();

    return message.react('👍');
  }
});