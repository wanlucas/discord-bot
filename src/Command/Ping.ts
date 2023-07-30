import Command from "../Entity/Command";

export default new Command({
  name: "ping",
  aliases: ["pong"],
  action: (client, message) => {
    message.reply(
      `🍆 Pong! Messagem: *${
        Date.now() - message.createdTimestamp
      }ms* | WebSocket: *${client.ws.ping}ms*`
    );
  }
});