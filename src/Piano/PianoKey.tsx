import React, {Touch} from 'react';
import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  View,
  Touchable,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import MultiSampleInstrument from './core/MultiSampleInstrument';

export enum KeyType {
  BLACK,
  WHITE,
}
// Only white key are labeled for clarity, as they're wider
// Black keys have empty strings as fallback mechanism
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
    props.instrument.play(props.noteIndex);
    return false;
  }
  function onPressOut() {
    if (props.instrument.stopOnRelease) {
      props.instrument.stop(props.noteIndex);
    }
    return false;
  }
  function getKeyStyle(keyType: KeyType): StyleProp<ViewStyle> {
    if (keyType === KeyType.WHITE) {
      return {
        height: 300,
        zIndex: 0,
      };
    }
    return {
      marginRight: styles.blackPianoKey.marginRight * props.keyWidthScale,
      marginLeft: styles.blackPianoKey.marginLeft * props.keyWidthScale,
      height: 200,
      zIndex: 1,
      left: props.shift * 4,
    };
  }
  function getInnerKeyStyle(keyType: KeyType) {
    const common = {
      borderWidth: 1,
      borderRadius: 4,
      justifyContent: 'flex-end',
      alignItems: 'center',
    };
    if (keyType === KeyType.WHITE) {
      return {
        ...common,
        height: 300,
        minWidth: 48 * props.keyWidthScale,
        backgroundColor: 'white',
        borderColor: '#ddd',
      };
    }
    return {
      ...common,
      height: 200,
      backgroundColor: 'black',
      minWidth: 36 * props.keyWidthScale,
      borderColor: 'white',
    };
  }

  function getKeyCaption() {
    const letterIndex = (props.noteIndex - 4 + 12) % 12;
    let letter = noteNames[letterIndex];

    if (letter) {
      const octNum = Math.ceil((props.noteIndex - 3) / 12).toString();
      return `${letter}${octNum}`;
    }
    return '';
  }

  function getCaptionStyle() {
    return {
      ...styles.whitePianoKeyCaption,
      fontSize: styles.whitePianoKeyCaption.fontSize * props.keyWidthScale,
    };
  }

  return (
    <View style={getKeyStyle(props.keyType)}>
      <TouchableHighlight
        onPressIn={() => onPressIn()}
        onPressOut={() => onPressOut()}
        underlayColor={
          props.keyType === KeyType.WHITE
            ? 'rgba(0,0,0,0.32)'
            : 'rgba(173,173,173,1)'
        }
        activeOpacity={1}
        style={getInnerKeyStyle(props.keyType) as StyleProp<ViewStyle>}
        onPress={() => {}}>
        <Text style={getCaptionStyle()}>{getKeyCaption()}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PianoKey;

const styles = StyleSheet.create({
  pianoKey: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  whitePianoKey: {},
  blackPianoKey: {
    marginLeft: -36 / 2,
    marginRight: -36 / 2,
  },
  whitePianoKeyCaption: {
    fontSize: 16,
    color: 'rgba(0,0,0,.16)',
    marginBottom: 10,
  },
});
