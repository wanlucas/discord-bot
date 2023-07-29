import { ClientEvents } from 'discord.js';
import Client from "../Entity/Client"

export default class Event {
  constructor(
    public readonly name: keyof ClientEvents,
    public readonly run: (client: Client, ...payload: any) => void
  ) { }
}