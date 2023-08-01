
import { Message } from "discord.js";
import { Command, Client } from "../Entity";
import { lyricsExtractor as extractor } from '@discord-player/extractor';
import * as embed from '../Components/embed';

const lyricsExtractor = extractor();

export default new Command({
  name: 'lyrics',
  aliases: ['letra'],
  action: async (client: Client, message: Message) => {
    const queue = client.player.nodes.get(message.guildId!);
    const song = queue?.currentTrack;

    if (!song) return message.reply('Letra do que?');

    const result = await lyricsExtractor.search(song.title).catch(() => null);

    if (!result) return message.reply('Não encontrei a letra dessa, foi mal.');

    const { lyrics } = result;
    const treatedLyrics = lyrics.length <= 4083 ? lyrics : `${lyrics.slice(0, 4080)}...`;

    const author = {
      name: song.author,
      iconURL: song.thumbnail,
      url: song.url
    };

    const embedLyrics = embed.lyrics(
      song.title,
      song.url,
      song.thumbnail,
      author,
      treatedLyrics,
    )

    return message.reply({ embeds: [embedLyrics] });
  }
});