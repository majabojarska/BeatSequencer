import _ from 'lodash';
import {ToastAndroid} from 'react-native';
import Sound from 'react-native-sound';

export default class SingleSampleInstrument {
  private sequence: boolean[] = [];
  private sound: Sound;
  constructor(public readonly iconResource: any, readonly sample: string) {
    this.sound = new Sound(sample, Sound.MAIN_BUNDLE, (error) => {
      this.sound.setVolume(0.9);
      if (error) {
        ToastAndroid.show(
          `Failed to load sound ${JSON.stringify(error)}`,
          ToastAndroid.LONG,
        );
        return;
      }
    });
  }

  getSequence() {
    return this.sequence;
  }

  public setSequenceLength(bars: number, beatsPerBar: number) {
    const length = bars * beatsPerBar;
    const oldSequence = this.sequence.slice(0, length);
    this.sequence = Array(length).fill(false);
    _.merge(this.sequence, oldSequence);
  }

  public setBeat(nth: number, on: boolean = true) {
    this.sequence[nth] = on;
  }

  public tick(n: number) {
    if (this.sequence[n]) {
      this.sound.stop();
      this.sound.play();
    }
  }
}
