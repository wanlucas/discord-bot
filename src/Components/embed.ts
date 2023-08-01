import { EmbedBuilder } from 'discord.js';
import { title } from 'process';

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

export const lyrics = (
  title: string,
  url: string,
  thumbnail: string,
  author: {
    name: string,
    iconURL: string,
    url: string,
  },
  lyrics: string
) => new EmbedBuilder()
    .setColor(primaryColor)
    .setTitle(title)
    .setURL(url)
    .setThumbnail(thumbnail)
    .setAuthor(author)
    .setDescription(lyrics)
    .setTimestamp()