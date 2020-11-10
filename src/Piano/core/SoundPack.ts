import {ToastAndroid} from 'react-native';
import Sound from 'react-native-sound';
import _, {map} from 'lodash';

export default class SoundPack {
  private sampleMap: Map<number, Sound> = new Map();
  private sampleUsage: Map<number, number> = new Map();
  static readonly soundLimit = 64;

  constructor(
    public readonly namespace: string,
    public readonly indexStart: number,
    public readonly indexStop: number,
    private readonly reservedSounds = 0,
    private readonly limit = SoundPack.soundLimit - reservedSounds,
  ) {}

  public async init(): Promise<void> {
    const halfLimit = Math.round(this.limit / 2);
    const middle = Math.round((this.indexStop - this.indexStart) / 2);
    const iStart = Math.max(middle - halfLimit, this.indexStart);
    const iStop = Math.min(middle + halfLimit, this.indexStop);

    for (let noteIndex = iStart; noteIndex <= iStop; noteIndex++) {
      await this.loadSample(noteIndex);
    }
  }

  public async loadSample(noteIndex: number): Promise<Sound | undefined> {
    if (_.inRange(noteIndex, this.indexStart, this.indexStop + 1)) {
      if (this.sampleMap.size >= this.limit) {
        this.releaseLeastUsed();
      }

      return await new Promise((resolve, reject) => {
        // Expecting file names in the following format: <namespace><noteIndex>.wav
        const fileName = this.getFileName(noteIndex);
        const sound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            const msg = `Failed to load sound ${fileName}, ${JSON.stringify(
              error,
            )}`;
            console.log(msg);
            ToastAndroid.show(msg, ToastAndroid.LONG);
            reject(error);
          } else {
            console.log(`Loaded sound ${fileName}, ${sound.isLoaded()}`);
            this.sampleMap.set(noteIndex, sound);
            this.sampleUsage.set(noteIndex, 0);
            resolve(sound);
          }
        });
      });
    }
  }

  public release() {
    console.log('====================================');
    console.log("Releasing soundPack: " + this.namespace);
    console.log('====================================');
    this.sampleMap.forEach((sound) => {
      sound.release();
    });
  }

  public async getSample(noteIndex: number): Promise<Sound | undefined> {
    let sample: Sound | undefined;
    if (this.sampleMap.has(noteIndex)) {
      sample = this.sampleMap.get(noteIndex);
    } else {
      sample = await this.loadSample(noteIndex);
    }
    this.sampleUsage.set(noteIndex, this.sampleUsage.get(noteIndex) || 0 + 1);
    return sample;
  }

  private releaseLeastUsed() {
    const leastUsed = [...this.sampleUsage.entries()].sort(
      (a, b) => a[1] - b[1],
    );
    if (leastUsed.length) {
      this.sampleMap.get(leastUsed[0][0])?.release();
      this.sampleMap.delete(leastUsed[0][0]);
      this.sampleUsage.delete(leastUsed[0][0]);
    }
  }

  private getFileName(noteIndex: number): string {
    return `${this.namespace}_${noteIndex.toString().padStart(3, '0')}.wav`;
  }
}
