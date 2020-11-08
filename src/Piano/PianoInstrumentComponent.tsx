import React from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSampleInstrument from './core/MultiSampleInstrument';
import PianoKey, {KeyType} from './PianoKey';

const blackKeyNumsInOctave: Array<number> = [1, 3, 6, 8, 10];
const blackKeyShiftInOctave: Array<number> = [-1, 1, -1, 0, 1];
const keyCountPerOctave = 12;

// const blackKeyWidth = 30;
interface Props {
  instrument: MultiSampleInstrument;
}
const PianoInstrumentComponent = ({instrument}: Props) => {
  // State określajacy skalowanie szerokosci

  return (
    <View style={styles.pianoView}>
      <View style={styles.pianoRowView}>
        {Array(88)
          .fill(0)
          .map((_b: boolean, noteIndex: number) => {
            noteIndex += 9;
            let keyType = KeyType.WHITE;
            let shift = 0;
            const blackIndex = blackKeyNumsInOctave.findIndex(
              (v) => v === noteIndex % keyCountPerOctave,
            );
            if (blackIndex >= 0) {
              keyType = KeyType.BLACK;
              shift = blackKeyShiftInOctave[blackIndex];
            }
            return (
              <PianoKey
                key={noteIndex - 8}
                instrument={instrument}
                noteIndex={noteIndex - 8}
                keyType={keyType}
                shift={shift}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pianoView: {
    justifyContent: 'center',
    flex: 1,
    margin: 16,
  },
  pianoRowView: {
    flexDirection: 'row',
  },
});

export default PianoInstrumentComponent;
