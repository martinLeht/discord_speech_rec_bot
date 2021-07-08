import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { DiscordBot } from "../bot/DiscordBot";
import { Client } from "discord.js";
import SpeechRecognitionConfigurer from "../speech/SpeechRecognitionConfigurer";
import { SpeechRecognitionService } from "../services/SpeechRecognitionService";

let container = new Container();
const client = new Client();

container.bind<DiscordBot>(TYPES.Bot).to(DiscordBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(client);
container.bind<SpeechRecognitionService>(TYPES.SpeechRecognitionService).to(SpeechRecognitionService).inSingletonScope();
container.bind<SpeechRecognitionConfigurer>(TYPES.SpeechRecognitionConfigurer).toConstantValue(
    new SpeechRecognitionConfigurer(client, container.get<SpeechRecognitionService>(TYPES.SpeechRecognitionService)))


export default container;