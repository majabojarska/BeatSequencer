import Sound from 'react-native-sound';
import SingleSampleInstrument from './SingleSampleInstrument';
import {EventDispatcher} from 'strongly-typed-events';

export default class SequenceManager {
  private bpm = 180;
  private playInterval: NodeJS.Timeout | null = null;
  public readonly instruments: SingleSampleInstrument[] = [];

  private bars = 4;
  private beatsPerBar = 4;
  private sequenceCounter = -1;

  private _onCounterChange = new EventDispatcher<SequenceManager, number>();
  public get onCounterChange() {
    return this._onCounterChange.asEvent();
  }

  constructor() {
    Sound.setCategory('Playback');
  }

  get currentBeat() {
    return this.sequenceCounter;
  }

  private get sequenceLength() {
    return this.bars * this.beatsPerBar;
  }

  public isPlaying() {
    return !!this.playInterval;
  }

  public getBeatsPerBar() {
    return this.beatsPerBar;
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
    instrument.setSequenceLength(this.bars, this.beatsPerBar);
    this.instruments.push(instrument);
  }

  public setSequenceLength(bars: number, beatsPerBar: number) {
    this.bars = bars;
    this.beatsPerBar = beatsPerBar;
    this.instruments.forEach((ins) => ins.setSequenceLength(bars, beatsPerBar));
  }

  private restartInterval() {
    this.clearInterval();
    this.playInterval = setInterval(
      this.tick.bind(this),
      (60 * 1000) / this.bpm,
    );
  }

  private clearInterval() {
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  }

  private tick() {
    console.log('tick');
    const p1 = performance.now();
    this.sequenceCounter = (this.sequenceCounter + 1) % this.sequenceLength;
    this.instruments.forEach((ins) => {
      ins.tick(this.sequenceCounter);
    });
    this._onCounterChange.dispatch(this, this.sequenceCounter);
    console.log(performance.now() - p1);
  }
}
