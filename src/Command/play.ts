
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: 'play',
  aliases: ['p', 'toca', 'tocar'],
  action: async (client: Client, message: Message, args: string[] = []) => {
    const channel = message.member?.voice.channel;

    if (!channel) return message.reply('Você não está em um canal de voz!');
    if (!args.length) return message.reply('Qual Música?');
    if (!channel.joinable) return message.reply('Não posso entrar aí!');

    const queue = client.player.nodes.create(message.guildId!, {
      metadata: {
        channel: message.channel,
      }
    });

    if (queue.channel && queue.channel.id !== channel.id) {
      return message.reply('Sou só um, meu parceiro');
    }

    const reply = message.reply('Análise... 🤨');
    const { tracks, playlist } = await client.player.search(args.join(' '));

    if (!tracks.length) return message.reply('Não encontrei essa música!');

    if (!queue.connection) {
      await queue.connect(channel).catch((error) => {
        if (!queue?.deleted) queue?.delete();
        throw error;
      });
    }

    if (playlist) queue.addTrack(tracks);
    else queue.addTrack(tracks[0]);

    if (!queue.isPlaying()) await queue.node.play();

    reply.then((message) => message.delete());

    return message.react('🍆');
  }
});


