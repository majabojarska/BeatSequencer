import {reject} from 'lodash';
import {ToastAndroid} from 'react-native';
import Sound from 'react-native-sound';

export default class SoundPack {
  private sampleMap: Map<number, Sound> = new Map();

  constructor(
    public readonly namespace: string,
    public readonly indexStart: number,
    public readonly indexStop: number,
  ) {}

  public async init(): Promise<void> {
    for (
      let noteIndex = this.indexStart;
      noteIndex <= this.indexStop;
      noteIndex++
    ) {
      await new Promise((resolve, reject) => {
        // Expecting file names in the following format: <namespace><noteIndex>.wav
        const fileName = this.getFileName(noteIndex);
        this.sampleMap.set(
          noteIndex,
          new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              const msg = `Failed to load sound ${fileName}, ${JSON.stringify(
                error,
              )}`;
              console.log(msg);
              ToastAndroid.show(msg, ToastAndroid.LONG);
              reject(error);
            } else {
              console.log(`Loaded sound ${fileName}`);
              resolve();
            }
          }),
        );
        this.sampleMap.get(noteIndex)?.setVolume(0.9);
        // Loaded single sample
      });
    }
  }

  private getFileName(noteIndex: number): string {
    return `${this.namespace}_${noteIndex.toString().padStart(3, '0')}.wav`;
  }

  public getSample(noteIndex: number) {
    return this.sampleMap.get(noteIndex);
  }
}
