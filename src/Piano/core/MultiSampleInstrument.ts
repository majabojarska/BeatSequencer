import SoundPack from './SoundPack';

export default interface MultiSampleInstrument {
  play: (noteIndex: number) => void;
  stop: (noteIndex: number) => void;
}
