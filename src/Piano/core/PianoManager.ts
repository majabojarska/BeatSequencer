import MultiSampleInstrument from './MultiSampleInstrument';
import DummyPianoInstrument from './DummyPianoInstrument';

export default class PianoManager {
  private activeInstrument?: MultiSampleInstrument = new DummyPianoInstrument();
  private availableInstruments: Map<string, MultiSampleInstrument> = new Map();

  public addInstrument(name: string, instrument: MultiSampleInstrument) {
    this.availableInstruments.set(name, instrument);
    return this;
  }

  public setActiveInstrument(name: string) {
    this.activeInstrument = this.availableInstruments.get(name);
    return this;
  }

  public getActiveInstrument() {
    return this.activeInstrument;
  }

  public getAvailableInstrumentNames(): Array<string> {
    return Array.from(this.availableInstruments.keys());
  }

  public play(noteIndex: number) {
    if (this.activeInstrument) {
      this.activeInstrument.stop(noteIndex);
      this.activeInstrument.play(noteIndex);
    }
  }

  public stop(noteIndex: number) {
    if (this.activeInstrument) {
      this.activeInstrument.stop(noteIndex);
    }
  }
}
