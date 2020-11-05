import PianoManager from './PianoManager';
import SoundPack from './SoundPack';
import PianoInstrument from './PianoInstrument';

export default class PianoManagerFactory {
  public static getBase(): PianoManager {
    return new PianoManager();
  }

  public static async setPiano(
    pianoManager: PianoManager,
  ): Promise<PianoManager> {
    const pianoSoundPack = new SoundPack('piano', 1, 64);
    await pianoSoundPack.init();
    pianoManager.addInstrument('Piano', new PianoInstrument(pianoSoundPack));
    pianoManager.setActiveInstrument('Piano');

    // Todo: add more instruments

    return pianoManager;
  }
}
