import React, {useCallback, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Subheading, Surface, Text} from 'react-native-paper';
import {RootStackParamList} from '../App';
// import Tone from 'react-native-tone2';
import {ScrollView, StyleSheet, View} from 'react-native';
// import BottomControls from './BottomControls';
// import SingleSampleInstrumentComponent from './SingleSampleInstrumentComponent';
// import Progress from './Progress';
import PianoManager from './core/PianoManager';
import MultiSampleInstrumentComponent from './MultiSampleInstrumentComponent';
import SequenceManager from '../Sequencer/core/SequenceManager';
import Progress from '../Sequencer/Progress';

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
  const sequenceManager: SequenceManager = (Piano as any).SequenceManager;
  return (
    <View style={styles.containerView}>
      <Progress sequenceManager={sequenceManager} />
      {/* <Progress sequenceManager={sequenceManager} /> */}

      {/*   <ScrollView horizontal style={styles.horizontalContainer}>
        <Subheading style={styles.subheader}>Piano</Subheading>
        <Surface style={styles.surface}>
          {pianoManager.map((instrument, i) => (
            <MultiSampleInstrumentComponent
              instrument={instrument}
              sequenceManager={pianoManager}
              key={i}
            />
          ))}
        </Surface>
      </ScrollView> */}
      <Text>Test</Text>
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
export default Piano;
