import { Client } from 'discord.js';
import { Message } from "discord.js";

export default class Command {
  constructor(
    public readonly name: string,
    public readonly action: (client: Client, message: Message, args: string[] | null) => void
  ) { }
}