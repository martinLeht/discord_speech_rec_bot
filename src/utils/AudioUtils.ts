export class AudioUtils {
    /**
   * Convert stereo audio buffer to mono
   * @param input Buffer of stereo audio
   * @returns
   */
  public static convertStereoToMono(input: Buffer): Buffer {
    console.log(input);
    const stereoData = new Int16Array(input);
    const monoData = new Int16Array(stereoData.length / 2);
    for (let i = 0, j = 0; i < stereoData.length; i += 4) {
      monoData[j++] = stereoData[i];
      monoData[j++] = stereoData[i + 1];
    }
    return Buffer.from(monoData);
  }

  public static getDurationFromMonoBuffer(buffer: Buffer): number {
    const duration = buffer.length / 48000 / 2;
    return duration;
  }
}

