import React, {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import SequenceManager from './core/SequenceManager';

interface Props {
  sequenceManager: SequenceManager;
}

const Progress = ({sequenceManager}: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = sequenceManager.onCounterChange.sub((_sm, c) => {
      setProgress(sequenceManager.currentBeat / sequenceManager.sequenceLength);
    });
    return unsub;
  }, []);

  return <ProgressBar progress={progress} />;
};

export default Progress;
