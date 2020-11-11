import MultiSampleInstrument from './MultiSampleInstrument';

export default class NullPianoInstrument implements MultiSampleInstrument {
  public readonly name = 'None';
  soundPack = null;
  stopOnRelease = false;

  public play(_noteIndex: number) {}
  public stop(_noteIndex: number) {}
}
