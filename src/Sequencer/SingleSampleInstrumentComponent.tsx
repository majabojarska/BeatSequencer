import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
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
  return (
    <View style={styles.instrumentRowView}>
      <Image style={styles.instrumentIcon} source={instrument.iconResource} />
      {Array(sequenceManager.sequenceLength)
        .fill(0)
        .map((_b: boolean, i: number) => (
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
