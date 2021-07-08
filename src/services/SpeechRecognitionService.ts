import { protos, SpeechClient } from '@google-cloud/speech';
import { injectable } from 'inversify';

@injectable()
export class SpeechRecognitionService {

    private speechClient: SpeechClient;

    private readonly requestConfig: protos.google.cloud.speech.v1.IRecognitionConfig = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    }

    constructor() {
        this.speechClient = new SpeechClient();
    }

    public async speechToText(monoBuffer: Buffer) {

        const audio = {
            content: monoBuffer
        };
        
        const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
            audio: audio,
            config: this.requestConfig
        }
        const [response] = await this.speechClient.recognize(request);

        console.log(response)
        const transcription = this.getTranscriptionFromResponse(response);
        
        if (!transcription) return;

        console.log("Transcript: " + transcription);
        return transcription;
    }

    public getTranscriptionFromResponse(response: any) {
        return response.results?.map((res: any) => 
            res.alternatives[0].transcript).join('\n');
    }
    
}