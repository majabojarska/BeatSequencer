import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import MultiSampleInstrument from './core/MultiSampleInstrument';

export enum KeyType {
  BLACK,
  WHITE,
}

interface Props {
  instrument: MultiSampleInstrument;
  noteIndex: number;
  keyType: KeyType;
  shift: number;
}
const PianoKey: React.FC<Props> = (props: Props) => {
  function onPressIn() {
    console.log(`OnPressIn ${props.noteIndex}`);
    props.instrument.play(props.noteIndex);
    return false;
  }
  function onPressOut() {
    console.log(`OnPressOut ${props.noteIndex}`);
    if (props.instrument.stopOnRelease) {
      props.instrument.stop(props.noteIndex);
    }
    return false;
  }
  function getKeyStyle(keyType: KeyType) {
    if (keyType === KeyType.WHITE) {
      return styles.whitePianoKey;
    }
    return {
      ...styles.blackPianoKey,
      zIndex: 1,
      left: props.shift * 4,
    };
  }

  return (
    <Pressable
      style={[styles.pianoKey, getKeyStyle(props.keyType)]}
      onPress={() => {
        console.log('xd');
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      android_disableSound={true}
      android_ripple={{
        color:
          props.keyType === KeyType.BLACK
            ? 'rgba(255, 255, 255, .32)'
            : 'rgba(0, 0, 0, .32)',
      }}
    />
  );
};

export default PianoKey;

const keyWidthScale = 1.0;
const styles = StyleSheet.create({
  pianoKey: {
    alignItems: 'stretch',
  },
  ripple: {flex: 1},
  whitePianoKey: {
    backgroundColor: 'white',
    minWidth: 48 * keyWidthScale,
    borderColor: '#DDD',
    borderRadius: 4,
    borderWidth: 1,
    height: 300,
  },
  blackPianoKey: {
    marginLeft: (-36 * keyWidthScale) / 2,
    marginRight: (-36 * keyWidthScale) / 2,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 36 * keyWidthScale,
    height: 200,
  },
});
