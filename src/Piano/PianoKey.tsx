import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import MultiSampleInstrument from './core/MultiSampleInstrument';
import {TouchableRipple} from 'react-native-paper';

export enum KeyType {
  BLACK,
  WHITE,
}

interface Props {
  instrument: MultiSampleInstrument;
  noteIndex: number;
  keyType: KeyType;
}
const PianoKey: React.FC<Props> = (props: Props) => {
  function onPress() {
    console.log(`OnPress ${props.noteIndex}`);
    props.instrument.play(props.noteIndex);
  }

  function getKeyStyle(keyType: KeyType) {
    if (keyType == KeyType.WHITE) {
      return styles.whitePianoKey;
    }
    return styles.blackPianoKey;
  }

  return (
    <View
      style={[
        styles.pianoKey,
        getKeyStyle(props.keyType),
        {zIndex: props.keyType == KeyType.BLACK ? 1 : 0},
      ]}>
      <TouchableRipple
        rippleColor={
          props.keyType == KeyType.BLACK
            ? 'rgba(255, 255, 255, .32)'
            : undefined
        }
        onPress={onPress}
        style={{flex: 1}}
        touchSoundDisabled={true}>
        <View></View>
      </TouchableRipple>
    </View>
  );
};

export default PianoKey;

const keyWidthScale = 2.0;
const styles = StyleSheet.create({
  pianoKey: {
    alignItems: 'stretch',
  },
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
