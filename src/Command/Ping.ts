import Command from "../Entity/Command";

export default new Command(
  "ping",
  (_client, message) => {
    throw new Error("Erro de teste");
    message.reply("pong!");
  }
);