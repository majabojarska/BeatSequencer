import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {ScrollView, StyleSheet, View} from 'react-native';
import PianoInstrumentComponent from './PianoInstrumentComponent';
import SequenceManager from '../Sequencer/core/SequenceManager';
import Sequencer from '../Sequencer/Sequencer';
import PianoManagerFactory from './core/PianoManagerFactory';
import HeaderControls from './HeaderControls';

type PianoScreenRouteProp = RouteProp<RootStackParamList, 'Piano'>;
type PianoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Piano'
>;
export type NavigationProps = {
  route: PianoScreenRouteProp;
  navigation: PianoScreenNavigationProp;
};
const Piano = ({navigation, route}: NavigationProps) => {
  const sequenceManager: SequenceManager = (Sequencer as any).SequenceManager;

  const [pianoManager] = useState(PianoManagerFactory.getBase());
  const [instrument, setInstrument] = useState(
    pianoManager.getActiveInstrument(),
  );
  const [instrumentName, setInstrumentName] = useState('None');
  const [keyWidthScale, setKeyWidthScale] = useState(1.5);
  const [instrumentNames, setInstrumentNames] = useState(
    pianoManager.getAvailableInstrumentNames(),
  );

  useEffect(() => {
    async function init() {
      await PianoManagerFactory.getPianoManager(
        pianoManager,
        sequenceManager.instruments.length,
      );
      const active = pianoManager.getActiveInstrument();
      setInstrument(active);
      setInstrumentName(active.name);
      setInstrumentNames(pianoManager.getAvailableInstrumentNames());
    }
    init();
    return () => {
      pianoManager.destroy();
    };
  }, [pianoManager, sequenceManager]);

  const onControlsUpdate = (name: string, keyScale: number) => {
    pianoManager.setActiveInstrument(name);
    const active = pianoManager.getActiveInstrument();
    setInstrument(active);
    setInstrumentName(active.name);
    setKeyWidthScale(keyScale);
  };

  return (
    <View style={styles.containerView}>
      <HeaderControls
        navigation={navigation}
        route={route}
        keyScale={keyWidthScale}
        instrumentName={instrumentName}
        instrumentNames={instrumentNames}
        onUpdate={(...args) => onControlsUpdate(...args)}
      />
      <ScrollView horizontal style={styles.horizontalContainer}>
        <PianoInstrumentComponent
          instrument={instrument}
          keyWidthScale={keyWidthScale}
        />
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
