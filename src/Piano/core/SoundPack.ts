import {ToastAndroid} from 'react-native';
import Sound from 'react-native-sound';

export default class SoundPack {
  private sampleMap: Map<number, Sound> = new Map();

  constructor(
    public readonly namespace: string,
    private readonly sampleIndexStart: number,
    private readonly sampleIndexStop: number,
  ) {
    for (
      let noteIndex = sampleIndexStart;
      noteIndex <= sampleIndexStop;
      noteIndex++
    ) {
      const fileName = namespace + '-' + noteIndex.toString().padStart(3, '0');

      const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
        newSound.setVolume(0.9);
        if (error) {
          ToastAndroid.show(
            `Failed to load sound ${JSON.stringify(error)}`,
            ToastAndroid.LONG,
          );
          return;
        }
      });

      this.sampleMap.set(noteIndex, newSound);
    }
  }

  public getSample(noteIndex: number) {
    return this.sampleMap.get(noteIndex);
  }
}
