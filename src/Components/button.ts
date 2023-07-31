import { ButtonBuilder } from "discord.js";

export const pause = new ButtonBuilder()
  .setCustomId('pause')
  .setEmoji('<:w_pause:1106270708243386428>')
  .setStyle(1);

export const play = new ButtonBuilder()
  .setCustomId('play')
  .setEmoji('<:w_play:1106270709644271656>')
  .setStyle(1);

export const stop = new ButtonBuilder()
  .setCustomId('stop')
  .setEmoji('<:w_stop:1106272001909346386>')
  .setStyle(1);