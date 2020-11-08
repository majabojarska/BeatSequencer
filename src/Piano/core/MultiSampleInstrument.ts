import SoundPack from './SoundPack';

export default interface MultiSampleInstrument {
  stopOnRelease: boolean;
  soundPack: SoundPack | null;
  play: (noteIndex: number) => void;
  stop: (noteIndex: number) => void;
}
