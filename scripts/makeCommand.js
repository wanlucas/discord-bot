const fs = require('fs');
const path = require('path');

const [,, commandName] = process.argv;
const commandsPath = path.join(__dirname, `../src/Command/${commandName}.ts`);

if (fs.existsSync(commandsPath)) {
  console.log('Command already exists');
  process.exit(1);
}

let body = `
import { Client } from "discord.js";
import Command from "../Entity/Command";

export default new Command(
  "${commandName}",
  (client: Client) => {}
);`;

fs.writeFileSync(commandsPath, body, 'utf8')


