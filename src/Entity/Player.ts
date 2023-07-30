import { Player as DiscordPlayer } from 'discord-player';
import { YouTubeExtractor } from '@discord-player/extractor';
import Client from './Client';

export default class Player extends DiscordPlayer {
  constructor(client: Client) {
    super(client, {
      ytdlOptions: {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
      }
    });

    this.registerExtractors();
  }

  private async registerExtractors() {
    this.extractors.register(YouTubeExtractor, {});
  }
}