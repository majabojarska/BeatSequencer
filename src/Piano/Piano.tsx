import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
// import Tone from 'react-native-tone2';
import {ScrollView, StyleSheet, View} from 'react-native';
// import BottomControls from './BottomControls';
// import SingleSampleInstrumentComponent from './SingleSampleInstrumentComponent';
// import Progress from './Progress';
import PianoInstrumentComponent from './PianoInstrumentComponent';
import SequenceManager from '../Sequencer/core/SequenceManager';
import Sequencer from '../Sequencer/Sequencer';
import Progress from '../Sequencer/Progress';
import PianoManagerFactory from './core/PianoManagerFactory';

type PianoScreenRouteProp = RouteProp<RootStackParamList, 'Piano'>;
type PianoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Piano'
>;
type NavigationProps = {
  route: PianoScreenRouteProp;
  navigation: PianoScreenNavigationProp;
};
const Piano = ({navigation, route}: NavigationProps) => {
  const sequenceManager: SequenceManager = (Sequencer as any).SequenceManager;

  const [pianoManager, setPianoManager] = useState(
    PianoManagerFactory.getBase(),
  );
  const [instrument, setInstrument] = useState(
    pianoManager.getActiveInstrument(),
  );

  useEffect(() => {
    async function init() {
      await PianoManagerFactory.getPianoManager(
        pianoManager,
        sequenceManager.instruments.length,
      );
      setInstrument(pianoManager.getActiveInstrument());
    }
    init();
    return () => {
      pianoManager.destroy();
    };
  }, [pianoManager, sequenceManager]);

  return (
    <View style={styles.containerView}>
      <Progress sequenceManager={sequenceManager} />
      <ScrollView horizontal style={styles.horizontalContainer}>
        <PianoInstrumentComponent instrument={instrument} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  horizontalContainer: {
    flex: 1,
  },
  subheader: {
    marginLeft: 4,
  },
});
export default Piano;
