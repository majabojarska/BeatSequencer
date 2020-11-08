import MultiSampleInstrument from './MultiSampleInstrument';
import SoundPack from './SoundPack';

export default class PianoInstrument implements MultiSampleInstrument {
  constructor(
    public readonly soundPack: SoundPack,
    public readonly stopOnRelease = false,
  ) {}

  public async play(noteIndex: number) {
    const sound = await this.soundPack.getSample(noteIndex);
    console.log(
      'Got sample for noteIndex: ' +
        sound +
        ' | duration: ' +
        sound?.getDuration(),
    );

    if (sound) {
      sound.setNumberOfLoops(this.stopOnRelease ? 999 : 0);
      sound.stop(() => {
        console.log(
          'Playing noteIndex: ' +
            noteIndex +
            ' | duration: ' +
            sound.getDuration(),
        );

        sound.play(() => {
          console.log('Playback done for noteIndex: ' + noteIndex);
          //sound.stop();
        });
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
