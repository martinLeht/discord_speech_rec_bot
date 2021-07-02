import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { DiscordBot } from "../bot/DiscordBot";
import { Client } from "discord.js";
import { CommandInvoker } from "../command/CommandInvoker";

let container = new Container();

container.bind<DiscordBot>(TYPES.Bot).to(DiscordBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<CommandInvoker>(TYPES.CommandInvoker).to(CommandInvoker);

export default container;