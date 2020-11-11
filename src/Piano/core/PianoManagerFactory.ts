import PianoManager from './PianoManager';
import SoundPack from './SoundPack';
import PianoInstrument from './PianoInstrument';

export default class PianoManagerFactory {
  public static getBase(): PianoManager {
    return new PianoManager();
  }

  public static async getPianoManager(
    pianoManager: PianoManager,
    reservedSounds = 0,
  ): Promise<PianoManager> {
    const pianoSoundPack = new SoundPack('piano', 1, 64);
    pianoManager.addInstrument(new PianoInstrument('Piano', pianoSoundPack));

    const sawSoundPack = new SoundPack('saw', 1, 88, reservedSounds);
    pianoManager.addInstrument(
      new PianoInstrument('Saw Wave', sawSoundPack, true),
    );

    const sineSoundPack = new SoundPack('sine', 1, 88, reservedSounds);
    pianoManager.addInstrument(
      new PianoInstrument('Sine Wave', sineSoundPack, true),
    );

    const triangleSoundPack = new SoundPack('tri', 1, 88, reservedSounds);
    pianoManager.addInstrument(
      new PianoInstrument('Triangle Wave', triangleSoundPack, true),
    );

    const squareSoundPack = new SoundPack('square', 1, 88, reservedSounds);
    pianoManager.addInstrument(
      new PianoInstrument('Square Wave', squareSoundPack, true),
    );

    pianoManager.setActiveInstrument('Saw Wave');
    return pianoManager;
  }
}
