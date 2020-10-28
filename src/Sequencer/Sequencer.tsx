import React, {useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Subheading, Surface, Text} from 'react-native-paper';
import {RootStackParamList} from '../App';
import Tone from 'react-native-tone2';
import {ScrollView, StyleSheet, View} from 'react-native';
import SequenceManager from './core/SequenceManager';
import ControlButtons from './ControlButtons';
import SingleSampleInstrument from './core/SingleSampleInstrument';
import SingleSampleInstrumentComponent from './SingleSampleInstrumentComponent';

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
    const sm = new SequenceManager();
    sm.addSingleSampleInstrument(
      new SingleSampleInstrument(
        require('../assets/icons/001-bass-drum.png'),
        'kick.wav',
      ),
    );
    sm.addSingleSampleInstrument(
      new SingleSampleInstrument(
        require('../assets/icons/002-drum.png'),
        'snare.wav',
      ),
    );
    sm.addSingleSampleInstrument(
      new SingleSampleInstrument(
        require('../assets/icons/003-hi-hat.png'),
        'hihat.wav',
      ),
    );
    sm.addSingleSampleInstrument(
      new SingleSampleInstrument(
        require('../assets/icons/003-hi-hat.png'),
        'openhat.wav',
      ),
    );
    sm.addSingleSampleInstrument(
      new SingleSampleInstrument(
        require('../assets/icons/004-clapping.png'),
        'clap.wav',
      ),
    );
    sm.onCounterChange.sub((sm, c) => {
      setCurrentBeat(c);
    });
    return sm;
  });

  const [isPlaying, setIsPlaying] = useState(sequenceManager.isPlaying());
  const [currentBeat, setCurrentBeat] = useState(-1);
  function onStop() {
    sequenceManager.stop();
    setIsPlaying(sequenceManager.isPlaying());
  }
  function onPlay() {
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
      <ScrollView horizontal style={styles.horizontalContainer}>
        <ScrollView style={styles.verticalContainer}>
          <Subheading style={styles.subheader}>Drums</Subheading>
          <Surface style={styles.surface}>
            {sequenceManager.instruments.map((instrument, i) => (
              <SingleSampleInstrumentComponent
                instrument={instrument}
                beatsPerBar={sequenceManager.getBeatsPerBar()}
                currentBeat={currentBeat}
                key={i}
              />
            ))}
          </Surface>
        </ScrollView>
      </ScrollView>
      <ControlButtons
        isPlaying={isPlaying}
        onPlayPress={() => onPlay()}
        onStopPress={() => onStop()}
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
  },
  subheader: {
    marginLeft: 4,
  },
});
export default Sequencer;
