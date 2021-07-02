import { Message } from "discord.js";
import { ICommand } from "./ICommand";

export class BanishCommand implements ICommand {

    private message: Message;
    private args: string[];


    constructor(message: Message, args: string[]) {
        this.message = message;
        this.args = args;
    }

    public execute(): void {
        if (!this.message.mentions.users.size) {
            this.message.reply('I need the tag of a user in order to banish them!');
          }
  
          const taggedUser = this.message.mentions.users.first();
  
          if (taggedUser) {
            this.message.channel.send(`I shall BANISH (kick): ${taggedUser.username}`);
          }
    }
}