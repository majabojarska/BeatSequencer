import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, Text} from 'react-native-paper';
import Sequencer from './Sequencer/Sequencer';
import Home from './Home';
import SequenceManagerFactory from './Sequencer/core/SequenceManagerFactory';
import Piano from './Piano/Piano';
import PianoManagerFactory from './Piano/core/PianoManagerFactory';
const Stack = createStackNavigator();

export type RootStackParamList = {
  Sequencer: {};
  Piano: {};
  Home: {};
};

const App = () => {
  const [sequenceManager] = useState(() => {
    const sm = SequenceManagerFactory.getDrumSet();
    return sm;
  });
  (Sequencer as any).SequenceManager = sequenceManager;

  const [pianoManager] = useState(() => {
    const pm = PianoManagerFactory.getPianoManager();
    return pm;
  });
  (Piano as any).PianoManager = pianoManager;

  (Home as any).SequenceManager = sequenceManager;

  useEffect(
    () => () => {
      sequenceManager.stop();
    },
    [sequenceManager],
  );

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Gimme degree kinda app',
            }}
          />
          <Stack.Screen
            name="Sequencer"
            component={Sequencer}
            options={{title: 'Beat Sequencer'}}
          />
          <Stack.Screen
            name="Piano"
            component={Piano}
            options={{title: 'Piano'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
