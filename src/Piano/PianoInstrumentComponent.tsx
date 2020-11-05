import React from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSampleInstrument from './core/MultiSampleInstrument';
import PianoInstrument from './core/PianoInstrument';
import PianoKey, {KeyType} from './PianoKey';

const whiteKeyNumsInOctave: Array<number> = [0, 2, 4, 5, 7, 9, 11];
const blackKeyNumsInOctave: Array<number> = [1, 3, 6, 8, 10];
const keyCountPerOctave = 12;

const keyInOctaveToKeyType: Map<number, any> = new Map();

// const blackKeyWidth = 30;
interface Props {
  instrument: MultiSampleInstrument;
}
const PianoInstrumentComponent = ({instrument}: Props) => {
  // State określajacy skalowanie szerokosci

  return (
    <View
      style={{
        ...styles.pianoView,
      }}>
      <View
        style={{
          ...styles.pianoRowView,
        }}>
        {Array(88)
          .fill(0)
          .map((_b: boolean, noteIndex: number) => {
            let keyType = KeyType.WHITE;
            if (blackKeyNumsInOctave.includes(noteIndex % keyCountPerOctave)) {
              keyType = KeyType.BLACK;
            }
            return (
              <PianoKey
                key={noteIndex + 1}
                instrument={instrument}
                noteIndex={noteIndex + 1}
                keyType={keyType}
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
    margin: 4,
  },
  pianoRowView: {
    flexDirection: 'row',
  },
});

export default PianoInstrumentComponent;
