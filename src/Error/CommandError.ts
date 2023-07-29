import Error from "./Error";
import path from "path";

const commandErrorPath = path.join(__dirname, "logs", "command.json");

export default class CommandError extends Error {
  constructor(
    public message: string,
    public command: string,
  ) {
    super(message);
  }

  public static register(message: string, command: string) {
    const commandError = new CommandError(message, command);
  
    commandError.register();
    return commandError;
  } 

  public register() {
    super.register(commandErrorPath, this);
  }
}