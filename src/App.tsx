import React, {useEffect, useState} from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';
import {ProgressBar, Provider, Text} from 'react-native-paper';
import Sequencer from './Sequencer/Sequencer';
import Home from './Home';
import SequenceManagerFactory from './Sequencer/core/SequenceManagerFactory';
import Piano from './Piano/Piano';
import Progress from './Sequencer/Progress';
import _ from 'lodash';
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
  (Piano as any).SequenceManager = sequenceManager;

  useEffect(() => () => sequenceManager.stop(), [sequenceManager]);
  const [currentRoute, setCurrentRoute] = useState('Home');
  const progress = <Progress sequenceManager={sequenceManager} />;
  const getCurrent = (routes: {name: string}[]) => {
    return _.last(routes)?.name || currentRoute;
  };

  return (
    <Provider>
      <NavigationContainer
        onStateChange={(state) =>
          setCurrentRoute(state ? getCurrent(state.routes) : currentRoute)
        }>
        <Stack.Navigator
          screenOptions={{
            header: (props) => {
              return (
                <>
                  <Header {...props} />
                  {currentRoute === props.scene.route.name && progress}
                </>
              );
            },
          }}>
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
