import React, {useEffect, useState} from 'react';
import SequenceManager from './core/SequenceManager';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import SingleSampleInstrument from './core/SingleSampleInstrument';

interface Props {
  sequenceManager: SequenceManager;
  instrument: SingleSampleInstrument;
  k: number;
}

const tileSize = 36;
const BeatButton = ({sequenceManager, instrument, k}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [beat, setBeat] = useState(instrument.getSequence()[k]);

  const {colors} = useTheme();

  useEffect(() => {
    const unsub = sequenceManager.onCounterChange.sub((_sm, c) => {
      if (c === k) {
        setIsActive(true);
      } else if (c !== k) {
        setIsActive(false);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    instrument.setBeat(k, beat);
  }, [instrument, k, beat]);

  function getButtonStyle() {
    const bpb = sequenceManager.beatsPerBar;
    return {
      backgroundColor: beat
        ? isActive
          ? colors.primary
          : colors.accent
        : isActive
        ? colors.backdrop
        : colors.background,
      marginLeft: k % bpb !== 0 ? 4 : 16,
    };
  }

  return (
    <Button
      mode="contained"
      style={{
        ...styles.button,
        ...getButtonStyle(),
      }}
      onPress={() => setBeat(!beat)}>
      &nbsp;
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 0,
    minWidth: tileSize,
    height: tileSize,
    overflow: 'hidden',
  },
});

export default BeatButton;
