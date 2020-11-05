import PianoManager from './PianoManager';
import SoundPack from './SoundPack';
import PianoInstrument from './PianoInstrument';

export default class PianoManagerFactory {
  public static getBase(): PianoManager {
    return new PianoManager();
  }

  public static getPianoManager(): PianoManager {
    const pianoManager = this.getBase();

    pianoManager.addInstrument(
      'Piano',
      new PianoInstrument(new SoundPack('piano', 1, 88)),
    );

    pianoManager.setActiveInstrument(
      pianoManager.getAvailableInstrumentNames()[0],
    );

    return pianoManager;
  }
}
