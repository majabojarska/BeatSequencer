import PianoManager from './PianoManager';
import SoundPack from './SoundPack';
import PianoInstrument from './PianoInstrument';

export default class PianoManagerFactory {
  public static getBase(): PianoManager {
    return new PianoManager();
  }

  public static async getPianoManager(
    pianoManager: PianoManager,
  ): Promise<PianoManager> {
    const pianoSoundPack = new SoundPack('piano', 1, 64);
    await pianoSoundPack.init();
    pianoManager.addInstrument('Piano', new PianoInstrument(pianoSoundPack));

    const sawSoundPack = new SoundPack('saw', 1, 88);
    await sawSoundPack.init();
    pianoManager.addInstrument('Saw Wave', new PianoInstrument(sawSoundPack));

    const sineSoundPack = new SoundPack('sine', 1, 88);
    await sineSoundPack.init();
    pianoManager.addInstrument('Sine Wave', new PianoInstrument(sineSoundPack));

    // const triangleSoundPack = new SoundPack('triangle', 1, 88);
    // await triangleSoundPack.init();
    // pianoManager.addInstrument(
    //   'Triangle Wave',
    //   new PianoInstrument(triangleSoundPack),
    // );

    // const squareSoundPack = new SoundPack('square', 1, 88);
    // await squareSoundPack.init();
    // pianoManager.addInstrument(
    //   'Square Wave',
    //   new PianoInstrument(squareSoundPack),
    // );

    pianoManager.setActiveInstrument('Saw Wave');

    return pianoManager;
  }
}
