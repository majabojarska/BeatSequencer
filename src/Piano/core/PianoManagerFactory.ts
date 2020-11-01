import PianoManager from './PianoManager';
import MultiSampleInstrument from './MultiSampleInstrument';
import SoundPack from './SoundPack';

export default class PianoManagerFactory {
  private static soundPacks: Map<string, SoundPack> = new Map();

  public static getBase(): PianoManager {
    return new PianoManager();
  }

  public static getPianoManager(): PianoManager {
    const pianoManager = this.getBase();

    pianoManager.addInstrument(
      'Piano',
      new MultiSampleInstrument(new SoundPack('piano', 1, 88)),
    );

    pianoManager.setActiveInstrument(
      pianoManager.getAvailableInstrumentNames()[0],
    );

    return pianoManager;
  }
}
