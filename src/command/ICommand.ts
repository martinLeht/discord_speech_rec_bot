import { Message } from "discord.js";
import { Command } from "./Command";

export interface ICommand {
    readonly name: Command;
    execute(message: Message, args: string[]): void;
}