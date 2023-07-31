
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: 'unpause',
  aliases: ['volta', 'despausa'],
  action: (client: Client, message: Message) => {
    const queue = client.player.nodes.get(message.guildId!);

    if (!queue) return message.reply('Despausar o que?');

    queue.node.resume();

    return message.react('🍆');
  }
});