import SequenceManager from './SequenceManager';
import SingleSampleInstrument from './SingleSampleInstrument';

export default class SequenceManagerFactory {
  public static getBase() {
    return new SequenceManager();
  }

  public static getDrumSet() {
    return SequenceManagerFactory.getBase()
      .addSingleSampleInstrument(
        new SingleSampleInstrument(
          require('../../assets/icons/001-bass-drum.png'),
          'kick.wav',
        ),
      )
      .addSingleSampleInstrument(
        new SingleSampleInstrument(
          require('../../assets/icons/002-drum.png'),
          'snare.wav',
        ),
      )
      .addSingleSampleInstrument(
        new SingleSampleInstrument(
          require('../../assets/icons/003-hi-hat.png'),
          'hihat.wav',
        ),
      )
      .addSingleSampleInstrument(
        new SingleSampleInstrument(
          require('../../assets/icons/003-hi-hat.png'),
          'openhat.wav',
        ),
      )
      .addSingleSampleInstrument(
        new SingleSampleInstrument(
          require('../../assets/icons/004-clapping.png'),
          'clap.wav',
        ),
      );
  }
}
