import Sound from 'react-native-sound';
import SingleSampleInstrument from './SingleSampleInstrument';
import {EventDispatcher} from 'strongly-typed-events';

export default class SequenceManager {
  private bpm = 60;
  private playInterval: NodeJS.Timeout | null = null;
  public readonly instruments: SingleSampleInstrument[] = [];

  private _bars = 4;
  private _beatsPerBar = 4;
  private sequenceCounter = -1;

  private _onCounterChange = new EventDispatcher<SequenceManager, number>();
  public get onCounterChange() {
    return this._onCounterChange.asEvent();
  }

  constructor() {
    Sound.setCategory('Playback', true);
  }

  public get currentBeat() {
    return this.sequenceCounter;
  }

  public get sequenceLength() {
    return this._bars * this._beatsPerBar;
  }

  public get bars() {
    return this._bars;
  }

  public get beatsPerBar() {
    return this._beatsPerBar;
  }

  public isPlaying() {
    return !!this.playInterval;
  }

  public getBPM() {
    return this.bpm;
  }

  public setBPM(bpm: number) {
    this.bpm = bpm;
    if (this.isPlaying()) {
      this.restartInterval();
    }
    return this;
  }

  public play() {
    this.restartInterval();
  }

  public pause() {
    this.clearInterval();
  }

  public stop() {
    this.pause();
    this.sequenceCounter = -1;
    this._onCounterChange.dispatch(this, this.sequenceCounter);
  }

  public addSingleSampleInstrument(instrument: SingleSampleInstrument) {
    instrument.setSequenceLength(this._bars, this._beatsPerBar);
    this.instruments.push(instrument);
    return this;
  }

  public setSequenceLength(bars: number, beatsPerBar: number) {
    this._bars = bars;
    this._beatsPerBar = beatsPerBar;
    this.instruments.forEach((ins) => ins.setSequenceLength(bars, beatsPerBar));
  }

  private restartInterval() {
    this.clearInterval();
    const period = 60 / this._beatsPerBar / this.bpm;
    console.log(period);
    this.playInterval = setInterval(this.tick.bind(this), period * 1000);
  }

  private clearInterval() {
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  }

  private tick() {
    const p1 = performance.now();
    this.sequenceCounter = (this.sequenceCounter + 1) % this.sequenceLength;
    this.instruments.forEach((ins) => {
      ins.tick(this.sequenceCounter);
    });
    this._onCounterChange.dispatch(this, this.sequenceCounter);
    console.log('Perf', performance.now() - p1);
  }
}
