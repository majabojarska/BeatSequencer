import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-native-paper';
import Sequencer from './Sequencer/Sequencer';
import SequenceManager from './Sequencer/core/SequenceManager';
const Stack = createStackNavigator();

export type RootStackParamList = {
  Sequencer: {
    sequenceManager: SequenceManager;
  };
  Piano: {};
};

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sequencer"
            component={Sequencer}
            options={{title: 'Beat Sequencer'}}
          />
          {/*  <Stack.Screen
            name="Piano"
            component={Piano}
            options={{title: 'Piano'}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
