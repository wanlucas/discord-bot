
import { Message } from "discord.js";
import Client from "./Client";

export default class Command {
  constructor(
    public readonly name: string,
    public readonly action: (client: Client, message: Message, args: string[]) => void
  ) { }
}