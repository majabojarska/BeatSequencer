import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import BeatButton from './BeatButton';
import SequenceManager from './core/SequenceManager';
import SingleSampleInstrument from './core/SingleSampleInstrument';

interface Props {
  instrument: SingleSampleInstrument;
  sequenceManager: SequenceManager;
}
const tileSize = 36;
const SingleSampleInstrumentComponent = ({
  instrument,
  sequenceManager,
}: Props) => {
  const [seq, setSeq] = useState([...instrument.getSequence()]);

  function setBeat(nth: number, beat: boolean) {
    instrument.setBeat(nth, beat);
    setSeq([...instrument.getSequence()]);
  }

  return (
    <View style={styles.instrumentRowView}>
      <Image style={styles.instrumentIcon} source={instrument.iconResource} />
      {seq.map((_b: boolean, i: number) => (
        <BeatButton
          key={i}
          k={i}
          sequenceManager={sequenceManager}
          instrument={instrument}
        />
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
