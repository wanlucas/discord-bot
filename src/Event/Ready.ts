import { Client, Events } from "discord.js";
import Event from "../Entity/Event";

export default new Event(
  Events.ClientReady,
  (client: Client) => {
    console.log('Tô online!')
  }
);