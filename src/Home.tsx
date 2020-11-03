import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {RootStackParamList} from './App';
import SequenceManager from './Sequencer/core/SequenceManager';
import Progress from './Sequencer/Progress';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type NavigationProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};
const Home = ({navigation}: NavigationProps) => {
  const sequenceManager: SequenceManager = (Home as any).SequenceManager;
  const [dim, setDim] = useState(Dimensions.get('window'));
  const [direction, setDirection] = useState<'column' | 'row'>('row');
  Dimensions.addEventListener('change', () => {
    setDim(Dimensions.get('window'));
  });
  useEffect(() => {
    setDirection(dim.height > dim.width ? 'column' : 'row');
  }, [dim]);
  const {colors} = useTheme();

  return (
    <View style={{...styles.view, flexDirection: direction}}>
      <Progress sequenceManager={sequenceManager} />
      <TouchableRipple
        style={{...styles.btn, backgroundColor: colors.accent}}
        onPress={() => navigation.push('Sequencer', {})}>
        <Image
          style={styles.img}
          source={require('./assets/icons/006-drums.png')}
        />
      </TouchableRipple>
      <TouchableRipple
        style={{...styles.btn, backgroundColor: colors.primary}}
        onPress={() => navigation.push('Piano', {})}>
        <Image
          style={styles.img}
          source={require('./assets/icons/007-synthesizer.png')}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    flex: 1,
  },
  btn: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  img: {width: 150, height: 150},
});

export default Home;
