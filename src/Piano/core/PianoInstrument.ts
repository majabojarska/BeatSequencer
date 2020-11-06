import MultiSampleInstrument from './MultiSampleInstrument';
import SoundPack from './SoundPack';

export default class PianoInstrument implements MultiSampleInstrument {
  constructor(private readonly soundPack: SoundPack) {}

  public play(noteIndex: number) {
    const sound = this.soundPack.getSample(noteIndex);
    console.log(
      'Got sample for noteIndex: ' +
        sound +
        ' | duration: ' +
        sound?.getDuration(),
    );

    if (sound) {
      sound.stop(() => {
        console.log(
          'Playing noteIndex: ' +
            noteIndex +
            ' | duration: ' +
            sound.getDuration(),
        );

        sound.play(() => {
          console.log('Playback done for noteIndex: ' + noteIndex);
          sound.stop();
        });
      });
    }
  }

  public stop(noteIndex: number) {
    const sound = this.soundPack.getSample(noteIndex);
    if (sound) {
      sound.stop();
    }
  }
}
