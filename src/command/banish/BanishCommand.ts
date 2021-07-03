import { Message } from "discord.js";
import { Command } from "../Command";
import { ICommand } from "../ICommand";

export class BanishCommand implements ICommand {

    public readonly name: Command = Command.banish;

    public execute(message: Message, args: string[]): void {
        if (!message.mentions.users.size) {
            message.reply('I need the tag of a user in order to banish them!');
          }
  
          const taggedUser = message.mentions.users.first();
  
          if (taggedUser) {
            message.channel.send(`I shall BANISH (kick): ${taggedUser.username}`);
          }
    }
}