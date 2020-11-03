import React, {useCallback, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Subheading, Surface} from 'react-native-paper';
import {RootStackParamList} from '../App';
import {ScrollView, StyleSheet, View} from 'react-native';
import BottomControls from './BottomControls';
import SingleSampleInstrumentComponent from './SingleSampleInstrumentComponent';
import Progress from './Progress';
import HeaderControls from './HeaderControls';
import SequenceManager from './core/SequenceManager';

type SequencerScreenRouteProp = RouteProp<RootStackParamList, 'Sequencer'>;
type SequencerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sequencer'
>;
export type NavigationProps = {
  route: SequencerScreenRouteProp;
  navigation: SequencerScreenNavigationProp;
};

const Sequencer = ({navigation, route}: NavigationProps) => {
  const sequenceManager: SequenceManager = (Sequencer as any).SequenceManager;

  const [instruments, setInstruments] = useState([
    ...sequenceManager.instruments,
  ]);

  const [isPlaying, setIsPlaying] = useState(sequenceManager.isPlaying());

  const onStop = useCallback(() => {
    sequenceManager.stop();
    setIsPlaying(sequenceManager.isPlaying());
  }, [sequenceManager]);

  const onPlay = useCallback(() => {
    if (sequenceManager.isPlaying()) {
      sequenceManager.pause();
    } else {
      sequenceManager.play();
    }
    setIsPlaying(sequenceManager.isPlaying());
  }, [sequenceManager]);

  const onBpmChange = useCallback(
    (bpm: number) => {
      sequenceManager.setBPM(bpm);
    },
    [sequenceManager],
  );

  return (
    <View style={styles.containerView}>
      <HeaderControls
        navigation={navigation}
        route={route}
        sequenceManager={sequenceManager}
        onUpdate={() => setInstruments([...sequenceManager.instruments])}
      />

      <Progress sequenceManager={sequenceManager} />

      <ScrollView horizontal style={styles.horizontalContainer}>
        <ScrollView style={styles.verticalContainer}>
          <Subheading style={styles.subheader}>Drums</Subheading>
          <Surface style={styles.surface}>
            {instruments.map((instrument, i) => (
              <SingleSampleInstrumentComponent
                instrument={instrument}
                sequenceManager={sequenceManager}
                key={i}
              />
            ))}
          </Surface>
        </ScrollView>
      </ScrollView>
      <BottomControls
        isPlaying={isPlaying}
        onPlayPress={() => onPlay()}
        onStopPress={() => onStop()}
        bpm={sequenceManager.getBPM()}
        onBpmChange={(bpm) => onBpmChange(bpm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  verticalContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    margin: -4,
  },
  horizontalContainer: {
    flex: 1,
  },
  surface: {
    margin: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginBottom: 112,
  },
  subheader: {
    marginLeft: 4,
  },
});
export default Sequencer;
