import SoundPack from './SoundPack';

export default interface MultiSampleInstrument {
  readonly name: string;
  soundPack: SoundPack | null;
  stopOnRelease: boolean;

  play(noteIndex: number): void;
  stop(noteIndex: number): void;
}
