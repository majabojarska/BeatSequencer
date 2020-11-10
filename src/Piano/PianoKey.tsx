import React from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import MultiSampleInstrument from './core/MultiSampleInstrument';

export enum KeyType {
  BLACK,
  WHITE,
}
// Only full tones (white keys) are labeled for clarity
const noteNames = ['C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B'];
interface Props {
  instrument: MultiSampleInstrument;
  noteIndex: number;
  keyType: KeyType;
  shift: number;
  keyWidthScale: number;
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
      return {
        ...styles.whitePianoKey,
        minWidth: styles.whitePianoKey.minWidth * props.keyWidthScale,
      };
    }
    return {
      ...styles.blackPianoKey,
      minWidth: styles.blackPianoKey.minWidth * props.keyWidthScale,
      marginLeft: styles.blackPianoKey.marginLeft * props.keyWidthScale,
      marginRight: styles.blackPianoKey.marginRight * props.keyWidthScale,
      zIndex: 1,
      left: props.shift * 4,
    };
  }

  function getKeyCaption() {
    const letterIndex = (props.noteIndex - 4 + 12) % 12
    let letter = noteNames[letterIndex]

    if (letter) {
      const octNum = Math.ceil((props.noteIndex - 3) / 12).toString();
      return `${letter}${octNum}`;
    }
    return ""
  }

  function getCaptionStyle() {
    return {
      ...styles.whitePianoKeyCaption,
      fontSize: styles.whitePianoKeyCaption.fontSize * props.keyWidthScale,
    };
  }

  return (
    <Pressable
      style={[
        styles.pianoKey,
        getKeyStyle(props.keyType),
        {minWidth: getKeyStyle(props.keyType).minWidth},
      ]}
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
      }}>
      <Text style={[getCaptionStyle()]}>{getKeyCaption()}</Text>
    </Pressable>
  );
};

export default PianoKey;

const styles = StyleSheet.create({
  pianoKey: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ripple: {flex: 1},
  whitePianoKey: {
    backgroundColor: 'white',
    minWidth: 48,
    borderColor: '#DDD',
    borderRadius: 4,
    borderWidth: 1,
    height: 300,
  },
  blackPianoKey: {
    marginLeft: -36 / 2,
    marginRight: -36 / 2,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 36,
    height: 200,
  },
  whitePianoKeyCaption: {
    fontSize: 16,
    color: 'rgba(0,0,0,.16)',
    marginBottom: 10,
  },
});
