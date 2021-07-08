import { User } from "discord.js";

export interface ISpeechData {
    duration: number;
    audioBuffer: Buffer;
    content?: string,
    author: User
}