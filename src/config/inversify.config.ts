import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { DiscordBot } from "../bot/DiscordBot";
import { Client } from "discord.js";

let container = new Container();

container.bind<DiscordBot>(TYPES.Bot).to(DiscordBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

export default container;