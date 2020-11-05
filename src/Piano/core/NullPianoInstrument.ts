import MultiSampleInstrument from './MultiSampleInstrument';

export default class NullPianoInstrument implements MultiSampleInstrument {
  public play(noteIndex: number) {}
  public stop(noteIndex: number) {}
}
