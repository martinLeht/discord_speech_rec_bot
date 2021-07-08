import {Client, Guild, GuildMember, User, VoiceChannel} from 'discord.js';
import wav from 'wav';
import { ISpeechData } from './ISpeechData';

export class SpeechMsg {
  channel: VoiceChannel;
  /**
   * Speech to text translation
   */
  content?: string;
  author: User;
  /**
   * Duration in seconds
   */
  duration: number;
  /**
   * PCM mono 48k audio data
   */
  audioBuffer: Buffer;
  client: Client;
  /**
   * Voice message, it is emited `speech` event
   * @param client
   * @param data
   * @param channel
   * @private
   */
  constructor(client: Client, data: ISpeechData, channel: VoiceChannel) {
    this.client = client;
    this.channel = channel;
    this.author = data.author;
    this.audioBuffer = data.audioBuffer;
    this.duration = data.duration;
    this.content = data.content;
  }

  /**
   * Saves audio to .wav file
   * @param filename File directory, for example: `./test.wav`
   */
  public saveToFile(filename: string): void {
    const outputFile = new wav.FileWriter(filename, {
      sampleRate: 48000,
      channels: 1,
    });
    outputFile.write(this.audioBuffer);
    outputFile.end();
  }

  get member(): GuildMember | null {
    return this.guild.member(this.author);
  }
  
  get guild(): Guild {
    return this.channel.guild;
  }
}