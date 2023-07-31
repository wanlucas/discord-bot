import { EmbedBuilder } from 'discord.js';

const primaryColor = '#423e34';

const textLimiter = (text: string) => text
  .slice(0, 80)
  .concat(text.length >= 80 ?  '...' : '');

export const dashboard = (
  musicTitle: string,
  musicUrl: string, 
  musicThumbnail: string
) => new EmbedBuilder()
    .setColor(primaryColor)
    .setTitle(textLimiter(musicTitle))
    .setURL(musicUrl)
    .setThumbnail(musicThumbnail)
    .setTimestamp()
