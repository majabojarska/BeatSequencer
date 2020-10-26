import React, {useEffect, useState} from 'react';
import {FAB} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

type Callback = () => void;
interface Props {
  isPlaying: boolean;
  onPlayPress: Callback;
  onStopPress: Callback;
}

const ControlButtons = ({isPlaying, onPlayPress, onStopPress}: Props) => {
  const [playIcon, setPlayIcon] = useState('play');
  useEffect(() => {
    if (isPlaying) {
      setPlayIcon('pause');
    } else {
      setPlayIcon('play');
    }
  }, [isPlaying]);

  return (
    <View style={styles.fabView}>
      <FAB style={styles.fab} icon="stop" onPress={() => onStopPress()} small />
      <FAB style={styles.fab} icon={playIcon} onPress={() => onPlayPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  fabView: {
    position: 'absolute',
    margin: 16,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fab: {
    marginLeft: 8,
  },
});
export default ControlButtons;
