import { Message } from "discord.js";
import { Client, Command } from "../Entity";

export default new Command({
  name: "ping",
  aliases: [],
  action: (client: Client, message: Message) => {
    message.reply(
      `🍆 Pong! Messagem: *${
        Date.now() - message.createdTimestamp
      }ms* | WebSocket: *${client.ws.ping}ms*`
    );
  }
});