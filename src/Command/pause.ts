
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: 'pause',
  aliases: ['pausa'],
  action: (client: Client, message: Message) => {
    const queue = client.player.nodes.get(message.guildId!);

    if (!queue) return message.reply('Pausar o que?');

    queue.node.pause();

    return message.react('👍');
  }
});