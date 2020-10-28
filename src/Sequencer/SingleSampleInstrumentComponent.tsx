import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import SingleSampleInstrument from './core/SingleSampleInstrument';

interface Props {
  instrument: SingleSampleInstrument;
  beatsPerBar: number;
  currentBeat: number;
}
const tileSize = 36;
const SingleSampleInstrumentComponent = ({
  instrument,
  beatsPerBar,
  currentBeat,
}: Props) => {
  const {colors} = useTheme();
  const [seq, setSeq] = useState([...instrument.getSequence()]);

  function getButtonStyle(beat: boolean, i: number) {
    return {
      backgroundColor: beat
        ? currentBeat === i
          ? colors.primary
          : colors.accent
        : currentBeat === i
        ? colors.backdrop
        : colors.background,
      marginLeft: i % beatsPerBar !== 0 ? 4 : 16,
    };
  }

  function setBeat(nth: number, beat: boolean) {
    instrument.setBeat(nth, beat);
    setSeq([...instrument.getSequence()]);
  }

  return (
    <View style={styles.instrumentRowView}>
      <Image style={styles.instrumentIcon} source={instrument.iconResource} />
      {seq.map((beat: boolean, i: number) => (
        <Button
          mode="contained"
          key={i}
          style={{
            ...styles.button,
            ...getButtonStyle(beat, i),
          }}
          onPress={() => setBeat(i, !beat)}>
          &nbsp;
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  instrumentRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 724,
    height: tileSize,
    maxHeight: tileSize,
    margin: 8,
  },
  instrumentIcon: {
    width: tileSize,
    height: tileSize,
  },
  button: {
    width: 0,
    minWidth: tileSize,
    height: tileSize,
    overflow: 'hidden',
  },
});
export default SingleSampleInstrumentComponent;
