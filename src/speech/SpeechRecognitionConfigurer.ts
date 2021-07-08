/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, User, VoiceConnection } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { SpeechRecognitionService } from '../services/SpeechRecognitionService';
import { SpeechEventHandler } from './SpeechEventHandler';

@injectable()
export default class SpeechRecognitionConfigurer {

  private client: Client;
  private speechRecognitionService: SpeechRecognitionService;
  private speechEventHandler: SpeechEventHandler;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.SpeechRecognitionService) speechRecognitionService: SpeechRecognitionService
  ) {
    this.client = client;
    this.speechRecognitionService = speechRecognitionService;
    this.speechEventHandler = new SpeechEventHandler(client, speechRecognitionService);
  }

  public enableEventsForSpeechRecognition(): void {
    this.initUserJoinEvent();
    this.initSpeechEvent();
  }

  /**
   * Emit `userJoin` event on Client when user joins channel
   */
  private initUserJoinEvent(): void {
    this.client.on('voiceStateUpdate', (_old, newVoiceState) => {
      if (newVoiceState.connection) {
        console.log("USER JOIN EVENT");
        this.client.emit('userJoin', newVoiceState.connection);
      } 
    });
  }

  /**
   * Enables `speech` event on Client, which is called whenever someone stops speaking
   */
  private initSpeechEvent(): void {
    this.client.on('userJoin', (connection: VoiceConnection) => {
      connection.once('ready', () => {
        console.log("USER JOIN EVENT READYYY");
        this.speechEventHandler.handleSpeechRecieveEvent(connection);
      })
    });
  }
}