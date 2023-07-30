
import { Message } from "discord.js";
import Client from "./Client";

interface ICommand {
  name: string,
  aliases: string[],
  action: (client: Client, message: Message, args: string[]) => Promise<any> | any,
}

export default class Command {
  public name: string;
  public aliases: string[];
  public action: ICommand["action"];

  constructor({ name, aliases, action }: ICommand) {
    this.name = name;
    this.aliases = aliases;
    this.action = action;
  };
}