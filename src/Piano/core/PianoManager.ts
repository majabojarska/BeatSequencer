import MultiSampleInstrument from './MultiSampleInstrument';
import NullPianoInstrument from './NullPianoInstrument';
import PianoInstrument from './PianoInstrument';

export default class PianoManager {
  private activeInstrument: MultiSampleInstrument = new NullPianoInstrument();
  private availableInstruments: Map<string, PianoInstrument> = new Map();

  public addInstrument(name: string, instrument: PianoInstrument) {
    this.availableInstruments.set(name, instrument);
    return this;
  }

  public setActiveInstrument(name: string) {
    const newActiveInstrument = this.availableInstruments.get(name);
    if (newActiveInstrument) {
      this.activeInstrument = newActiveInstrument;
    }
    return this;
  }

  public getActiveInstrument(): MultiSampleInstrument {
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
