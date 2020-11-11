import MultiSampleInstrument from './MultiSampleInstrument';
import SoundPack from './SoundPack';

export default class PianoInstrument implements MultiSampleInstrument {
  constructor(
    public readonly name: string,
    public readonly soundPack: SoundPack,
    public readonly stopOnRelease = false,
  ) {}

  public async play(noteIndex: number) {
    const sound = await this.soundPack.getSample(noteIndex);
    if (sound) {
      sound.setNumberOfLoops(this.stopOnRelease ? 999 : 0);
      sound.stop(() => {
        sound.play();
      });
    }
  }

  public async stop(noteIndex: number) {
    const sound = await this.soundPack.getSample(noteIndex);
    if (sound) {
      sound.stop();
    }
  }
}
