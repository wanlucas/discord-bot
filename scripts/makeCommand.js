const fs = require('fs');
const path = require('path');

const [,, commandName] = process.argv;
const commandsPath = path.join(__dirname, `../src/Command/${commandName}.ts`);

if (fs.existsSync(commandsPath)) {
  console.log('Command already exists');
  process.exit(1);
}

let body = `
import { Message } from "discord.js";
import { Command, Client } from "../Entity";

export default new Command({
  name: '${commandName}',
  aliases: [],
  action: (client: Client, message: Message) => {}
});`;

fs.writeFileSync(commandsPath, body, 'utf8')


