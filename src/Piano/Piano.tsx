import React, {useCallback, useEffect, useRef, useState} from 'react';
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

  const [pianoManager, setPianoManager] = useState(
    PianoManagerFactory.getBase(),
  );
  const [instrument, setInstrument] = useState(
    pianoManager.getActiveInstrument(),
  );
  const [keyWidthScale, setKeyWidthScale] = useState(2);
  const [instrumentNames, setInstrumentNames] = useState(
    pianoManager.getAvailableInstrumentNames(),
  );

  useEffect(() => {
    async function init() {
      await PianoManagerFactory.getPianoManager(
        pianoManager,
        sequenceManager.instruments.length,
      );
      setInstrument(pianoManager.getActiveInstrument());
      setInstrumentNames(pianoManager.getAvailableInstrumentNames());
    }
    init();
    return () => {
      pianoManager.destroy();
    };
  }, [pianoManager, sequenceManager]);


  const onKeyWidthScaleChange = useCallback(
    (scale: number) => {
      setKeyWidthScale(scale);
    },
    [keyWidthScale],
  );

  const onInstrumentNameChange = useCallback(
    (name: string)=>{
      pianoManager.setActiveInstrument(name);
    },[instrument]
  )

  return (
    <View style={styles.containerView}>
      <HeaderControls
        navigation={navigation}
        route={route}
        pianoManager={pianoManager}
        keyWidthScale={keyWidthScale}
        instrumentNames={instrumentNames}
        onInstrumentNameChange={onInstrumentNameChange}
        onKeyWidthScaleChange={(scale) => {
          onKeyWidthScaleChange(scale);
        }}
        onUpdate={() => {}} // Todo: Implement onUpdate method
      />
      <Progress sequenceManager={sequenceManager} />
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
