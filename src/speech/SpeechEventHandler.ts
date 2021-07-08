import { Client, User, VoiceConnection } from 'discord.js';
import { SpeechRecognitionService } from '../services/SpeechRecognitionService';
import { AudioUtils } from '../utils/AudioUtils';
import { SpeechMsg } from './SpeechMsg';

export class SpeechEventHandler {

    private client: Client;
    private speechRecognitionService: SpeechRecognitionService

    constructor(client: Client, speechRecognitionService: SpeechRecognitionService) {
        this.client = client;
        this.speechRecognitionService = speechRecognitionService;
    }

    /**
    * Starts listening on connection and emits `speech` event when someone stops speaking
    * @param connection Connection to listen
    */
    public handleSpeechRecieveEvent(connection: VoiceConnection) {
        connection.on('speaking', (user) => {
            console.log("IN Speech Recieve");
            const audioStream = connection.receiver.createStream(user, {mode: 'pcm'});
            const bufferData: Uint8Array[] = [];

            audioStream.on('data', (data) => {
                bufferData.push(data);
            });

            audioStream.on('end', async () => {
                const speechMsg = await this.createSpeechMsg(bufferData, user, connection);
                if (speechMsg) this.client.emit('speech', speechMsg);
            });
        });
    }

    private async createSpeechMsg(bufferData: Uint8Array[], user: User, connection: VoiceConnection): Promise<SpeechMsg | void> {
        const stereoBuffer = Buffer.concat(bufferData);
        const monoBuffer = AudioUtils.convertStereoToMono(stereoBuffer);
        console.log(monoBuffer);

        const duration = AudioUtils.getDurationFromMonoBuffer(stereoBuffer);

        if (duration < 1 || duration > 19) return;

        let content;
        /* Create speech to text translation here */
        try {
            content = await this.speechRecognitionService.speechToText(monoBuffer);
            //content = await this.speechOptions.speechRecognition?.(monoBuffer, this.speechOptions);
        } catch (err) {
            this.client.emit('error', new Error(err))
        }
        
        const speechMsg: SpeechMsg = new SpeechMsg(this.client, {
            author: user,
            duration: duration,
            audioBuffer: stereoBuffer,
            content
        }, connection.channel);
        return speechMsg;
    }
}