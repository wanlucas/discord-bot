const fs = require('fs');
const path = require('path');

const [,, eventName] = process.argv;
const eventsPath = path.join(__dirname, `../src/Event/${eventName}.ts`);

if (fs.existsSync(eventsPath)) {
  console.log('Event already exists');
  process.exit(1);
}

let body = `
import { Events } from "discord.js";
import { Event, Client } from "../Entity";

export default new Event(
  Events.${eventName},
  (client: Client) => {}
);`;

fs.writeFileSync(eventsPath, body, 'utf8')


