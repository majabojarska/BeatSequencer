import SoundPack from './SoundPack';

export default class MultiSampleInstrument {
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
