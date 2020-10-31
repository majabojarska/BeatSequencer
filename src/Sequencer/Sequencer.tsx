import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProgressBar, Subheading, Surface, Text} from 'react-native-paper';
import {RootStackParamList} from '../App';
import Tone from 'react-native-tone2';
import {ScrollView, StyleSheet, View} from 'react-native';
import BottomControls from './BottomControls';
import SingleSampleInstrumentComponent from './SingleSampleInstrumentComponent';
import SequenceManagerFactory from './core/SequenceManagerFactory';
import Progress from './Progress';

type SequencerScreenRouteProp = RouteProp<RootStackParamList, 'Sequencer'>;
type SequencerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sequencer'
>;
type NavigationProps = {
  route: SequencerScreenRouteProp;
  navigation: SequencerScreenNavigationProp;
};

const Sequencer = ({navigation}: NavigationProps) => {
  const [sequenceManager] = useState(() => {
    const sm = SequenceManagerFactory.getDrumSet();
    return sm;
  });

  const [isPlaying, setIsPlaying] = useState(sequenceManager.isPlaying());
  function onStop() {
    sequenceManager.stop();
    setIsPlaying(sequenceManager.isPlaying());
  }
  function onPlay() {
    console.log('click');

    if (sequenceManager.isPlaying()) {
      sequenceManager.pause();
    } else {
      sequenceManager.play();
    }
    setIsPlaying(sequenceManager.isPlaying());
  }

  return (
    /** TODO: Playback progress on top, not scrollable */
    <View style={styles.containerView}>
      <Progress sequenceManager={sequenceManager} />

      <ScrollView horizontal style={styles.horizontalContainer}>
        <ScrollView style={styles.verticalContainer}>
          <Subheading style={styles.subheader}>Drums</Subheading>
          <Surface style={styles.surface}>
            {sequenceManager.instruments.map((instrument, i) => (
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
        onBpmChange={(bpm) => sequenceManager.setBPM(bpm)}
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
    paddingBottom: 80,
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
  },
  subheader: {
    marginLeft: 4,
  },
});
export default Sequencer;
