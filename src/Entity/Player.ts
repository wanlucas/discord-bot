import { Player as DiscordPlayer, PlayerEvents } from 'discord-player';
import { YouTubeExtractor, SpotifyExtractor } from '@discord-player/extractor';
import Client from './Client';
import * as embed from '../Components/embed';
import * as button from '../Components/button';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

export default class Player extends DiscordPlayer {
  constructor(client: Client) {
    super(client, {
      ytdlOptions: {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
      }
    });

    this.registerExtractors();
    this.registerEvents();
  }

  private async registerExtractors() {
    this.extractors.register(YouTubeExtractor, {});
    this.extractors.register(SpotifyExtractor, {});
  }

  private async registerEvents() {
    this.events.on('playerStart', async (message, track) => {
      // const controller = new ActionRowBuilder().addComponents(button.play, button.pause, button.stop);

      const response = await message.metadata.channel.send({ 
        // components: [controller],
        embeds: [embed.dashboard(
          track.title,
          track.url,
          track.thumbnail,
          )], 
        });
    
      // try {
      //   const { customId } = await response.awaitMessageComponent({ time: 60000 })
      //   console.log(customId)

      //   switch (customId) {
      //     case 'play':
      //       return console.log('play');
      //     case 'pause': 
      //       return console.log('pause');
      //     default: 
      //       console.log('default');
      //   }
      // } catch (error) {
      //   console.log(error)
      // }

    });

    this.events.on('audioTrackAdd', (message, track) => {
      message.metadata.channel.send(`${track.title} foi adicionado à fila!`);
    });
  }
}