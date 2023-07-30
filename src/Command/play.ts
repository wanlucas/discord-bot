
import { Message } from "discord.js";
import { Command, Client } from "../Entity";
import { QueryType } from "discord-player";

export default new Command(
  "play",
  async (client: Client, message: Message, args: string[] = []) => {
    if (!message.channel) {
      return message.reply('Você não está em um canal de voz!');
    }

    const queue = client.player.nodes.create(message.guildId!);

    if (!queue.connection) {
      await queue.connect(message.member?.voice.channel!).catch((error) => {
        if (!queue?.deleted) queue?.delete();
        throw error;
      });
    }

    if (!args.length) return message.reply('Qual Música?');

    const { tracks, playlist } = await client.player.search(args.join(' '), {
      searchEngine: QueryType.YOUTUBE,   
    });

    if (!tracks.length) return message.reply('Não encontrei essa música!');

    if (playlist) queue.addTrack(tracks);
    else queue.addTrack(tracks[0]);

    if (!queue.isPlaying()) await queue.node.play();

    return message.react('🍆');
  }
);


