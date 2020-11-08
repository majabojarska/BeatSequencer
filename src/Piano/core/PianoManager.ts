import MultiSampleInstrument from './MultiSampleInstrument';
import NullPianoInstrument from './NullPianoInstrument';

export default class PianoManager {
  private activeInstrument: MultiSampleInstrument = new NullPianoInstrument();
  private availableInstruments: Map<string, MultiSampleInstrument> = new Map();

  public addInstrument(name: string, instrument: MultiSampleInstrument) {
    this.availableInstruments.set(name, instrument);
    return this;
  }

  public setActiveInstrument(name: string) {
    const newActiveInstrument = this.availableInstruments.get(name);
    if (newActiveInstrument) {
      newActiveInstrument.soundPack?.init();
      this.activeInstrument.soundPack?.release();
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

  public destroy() {
    this.availableInstruments.forEach((instrument) => {
      instrument.soundPack?.release();
    });
  }
}
