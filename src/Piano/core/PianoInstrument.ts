import MultiSampleInstrument from './MultiSampleInstrument';
import SoundPack from './SoundPack';

export default class PianoInstrument implements MultiSampleInstrument {
  constructor(private readonly soundPack: SoundPack) {}

  public play(noteIndex: number) {
    const sound = this.soundPack.getSample(noteIndex);
    if (sound) {
      sound.play();
    }
  }

  public stop(noteIndex: number) {
    const sound = this.soundPack.getSample(noteIndex);
    if (sound) {
      sound.stop();
    }
  }
}
