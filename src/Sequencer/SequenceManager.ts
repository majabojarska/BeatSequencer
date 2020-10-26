export default class SequenceManager {
  private bpm = 120;
  private playInterval: NodeJS.Timeout | null = null;

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
    // TODO: reset Sequence counter or sth
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
  }
}
