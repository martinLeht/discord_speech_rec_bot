import * as fs from 'fs';
import { Client, Collection, Message, User } from "discord.js";
import { inject, injectable } from "inversify";
import { commands } from '../command';
import { TOKEN, PREFIX } from "../config/config";
import { TYPES } from "../config/types";
import { Command } from "../command/Command";
import { ICommand } from "../command/ICommand";
import { isCommaListExpression } from 'typescript';

@injectable()
export class DiscordBot {
  private client: Client;
  private commands: Collection<Command, ICommand>;
  private readonly token: string;

  constructor(
    @inject(TYPES.Client) client: Client
  ) {
    this.client = client;
    this.commands = new Collection();
    this.initCommands();
    
    this.token = TOKEN;
  }

  private initCommands(): void {
    for (const cmd of commands) {
      this.commands.set(cmd.name, cmd);
    }
  }

  public listen(): Promise < string > {
    this.client.on('message', (message: Message) => {
      console.log("Message received! Contents: ", message.content);

      if (!message.content.startsWith(PREFIX) || message.author.bot) return;

      const args: string[] = message.content.slice(PREFIX.length).trim().split(' ');
      let cmdKey = args.shift();
      if (!cmdKey) return;

      cmdKey = cmdKey.toLowerCase();
      let cmd: ICommand | undefined = this.getCommand(cmdKey); 
      
      if (!cmd) return;
      
      try {
        cmd.execute(message, args);
      } catch (err) {
        console.log('Something went wrong...\n' + err);
        message.reply('Something went wrong...\n' + err);
      }
    });

    return this.client.login(this.token);
  }

  private getCommand(cmdKey: string): ICommand | undefined {
    const cmd: Command = Command[cmdKey as keyof typeof Command];
    return this.commands.get(cmd);
  }
}