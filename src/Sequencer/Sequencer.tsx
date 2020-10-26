import React, {useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Subheading, Surface} from 'react-native-paper';
import {RootStackParamList} from '../App';
import Tone from 'react-native-tone2';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import SequenceManager from './SequenceManager';
import ControlButtons from './ControlButtons';

type SequencerScreenRouteProp = RouteProp<RootStackParamList, 'Sequencer'>;
type SequencerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sequencer'
>;
type NavigationProps = {
  route: SequencerScreenRouteProp;
  navigation: SequencerScreenNavigationProp;
};

const tileSize = 36;
const Sequencer = ({navigation}: NavigationProps) => {
  const [sequenceManager] = useState(new SequenceManager());
  const [isPlaying, setIsPlaying] = useState(sequenceManager.isPlaying());
  function onStop() {
    sequenceManager.stop();
  }
  function onPlay() {
    if (sequenceManager.isPlaying()) {
      sequenceManager.pause();
      setIsPlaying(false);
    } else {
      sequenceManager.play();
      setIsPlaying(true);
    }
  }

  const {colors} = useTheme();
  return (
    /** TODO: Playback progress on top, not scrollable */

    /** TODO: Make unified interface to define each instrument sequence, icon, sample, etc */

    /** TODO: Refactor this below, extract components for each card, each instrument */
    <View style={styles.containerView}>
      <ScrollView horizontal style={styles.horizontalContainer}>
        <ScrollView style={styles.verticalContainer}>
          <Subheading>Drums</Subheading>
          <Surface style={styles.surface}>
            <View style={styles.instrumentRowView}>
              <Image
                style={styles.instrumentIcon}
                source={require('../assets/icons/001-bass-drum.png')}
              />
              {new Array(16).fill(0).map((_e: number, i: number) => (
                <Button
                  mode="contained"
                  key={i}
                  style={{
                    width: 0,
                    minWidth: tileSize,
                    height: tileSize,
                    marginLeft: i % 4 != 0 ? 4 : 16,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                  }}
                  onPress={() => {}}>
                  &nbsp;
                </Button>
              ))}
            </View>
            <View style={styles.instrumentRowView}>
              <Image
                style={styles.instrumentIcon}
                source={require('../assets/icons/002-drum.png')}
              />
              {new Array(16).fill(0).map((_e: number, i: number) => (
                <Button
                  mode="contained"
                  key={i}
                  style={{
                    width: 0,
                    minWidth: tileSize,
                    height: tileSize,
                    marginLeft: i % 4 != 0 ? 4 : 16,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                  }}
                  onPress={() => {}}>
                  &nbsp;
                </Button>
              ))}
            </View>
            <View style={styles.instrumentRowView}>
              <Image
                style={styles.instrumentIcon}
                source={require('../assets/icons/003-hi-hat.png')}
              />
              {new Array(16).fill(0).map((_e: number, i: number) => (
                <Button
                  mode="contained"
                  key={i}
                  style={{
                    width: 0,
                    minWidth: tileSize,
                    height: tileSize,
                    marginLeft: i % 4 != 0 ? 4 : 16,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                  }}
                  onPress={() => {}}>
                  &nbsp;
                </Button>
              ))}
            </View>
            <View style={styles.instrumentRowView}>
              <Image
                style={styles.instrumentIcon}
                source={require('../assets/icons/004-clapping.png')}
              />
              {new Array(16).fill(0).map((_e: number, i: number) => (
                <Button
                  mode="contained"
                  key={i}
                  style={{
                    width: 0,
                    minWidth: tileSize,
                    height: tileSize,
                    marginLeft: i % 4 != 0 ? 4 : 16,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                  }}
                  onPress={() => {}}>
                  &nbsp;
                </Button>
              ))}
            </View>
            <View style={styles.instrumentRowView}>
              <Image
                style={styles.instrumentIcon}
                source={require('../assets/icons/005-maracas.png')}
              />
              {new Array(16).fill(0).map((_e: number, i: number) => (
                <Button
                  mode="contained"
                  key={i}
                  style={{
                    width: 0,
                    minWidth: tileSize,
                    height: tileSize,
                    marginLeft: i % 4 != 0 ? 4 : 16,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                  }}
                  onPress={() => {}}>
                  &nbsp;
                </Button>
              ))}
            </View>
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
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  verticalContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
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
});
export default Sequencer;
