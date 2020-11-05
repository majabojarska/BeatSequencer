import MultiSampleInstrument from './MultiSampleInstrument';

export default class DummyPianoInstrument implements MultiSampleInstrument {
  public play(noteIndex: number) {}
  public stop(noteIndex: number) {}
}
