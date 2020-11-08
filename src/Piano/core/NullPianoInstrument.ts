import MultiSampleInstrument from './MultiSampleInstrument';

export default class NullPianoInstrument implements MultiSampleInstrument {
  stopOnRelease = false;
  soundPack = null;
  public play(_noteIndex: number) {}
  public stop(_noteIndex: number) {}
}
