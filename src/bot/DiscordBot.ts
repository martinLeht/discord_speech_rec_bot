import { Client, Message, User } from "discord.js";
import { inject, injectable } from "inversify";
import { BanishCommand } from "../command/BanishCommand";
import { CommandInvoker } from "../command/CommandInvoker";
import { TOKEN, PREFIX } from "../config/config";
import { TYPES } from "../config/types";
import { Command } from "../config/Command";

@injectable()
export class DiscordBot {
  private client: Client;
  private invoker: CommandInvoker;
  private readonly token: string;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.CommandInvoker) invoker: CommandInvoker
  ) {
    this.client = client;
    this.invoker = invoker;
    this.token = TOKEN;
  }

  public listen(): Promise < string > {
    this.client.on('message', (message: Message) => {
      console.log("Message received! Contents: ", message.content);

      if (!message.content.startsWith(PREFIX) || message.author.bot) return;

      const args: string[] = message.content.slice(PREFIX.length).trim().split(' ');
      let cmd = args.shift();

      if (!cmd) return;      
      cmd = cmd.toLowerCase();

      if (cmd === Command.Banish) {
        this.invoker.setOnBanish(new BanishCommand(message, args));
        this.invoker.doBanish();
      }
      
      
    });

    return this.client.login(this.token);
  }
}