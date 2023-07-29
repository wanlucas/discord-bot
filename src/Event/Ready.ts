import { Client, Events } from "discord.js";
import Event from "../Entity/Event";

export default new Event(
  Events.ClientReady,
  (_client: Client) => {
    console.log('Ready!')
  }
);