import React, {useEffect, useRef, useState} from 'react';
import {FAB, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

type Callback = () => void;
interface Props {
  isPlaying: boolean;
  onPlayPress: Callback;
  onStopPress: Callback;
  bpm: number;
  onBpmChange: (bpm: number) => void;
}

const BottomControls = ({
  isPlaying,
  onPlayPress,
  onStopPress,
  bpm,
  onBpmChange,
}: Props) => {
  const [playIcon, setPlayIcon] = useState('play');
  const [innerBpmText, setInnerBpmText] = useState(bpm.toString());
  const [innerBpm, setInnerBpm] = useState(bpm);
  const longPress = useRef(false);
  const numpadOpened = useRef(false);
  useEffect(() => {
    if (isPlaying) {
      setPlayIcon('pause');
    } else {
      setPlayIcon('play');
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!numpadOpened.current) {
      onBpmChange(innerBpm);
    }
  }, [innerBpm]);

  useEffect(() => {
    const parsed = parseInt(innerBpmText, 10);
    if (parsed) {
      setInnerBpm(parsed);
    }
  }, [innerBpmText]);

  useEffect(() => {
    setInnerBpmText(innerBpm.toString());
  }, [innerBpm]);

  function onLongPress(lastBpm: number, inc = true) {
    if (longPress.current) {
      const f = inc ? 1 : -1;
      setInnerBpm(lastBpm + f);
      setTimeout(() => onLongPress(lastBpm + f, inc), 10);
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.bpmView}>
        <FAB
          icon="minus"
          onPress={() => setInnerBpm(innerBpm - 1)}
          small
          onLongPress={() => {
            longPress.current = true;
            onLongPress(innerBpm, false);
          }}
          onTouchEnd={() => (longPress.current = false)}
        />
        <TextInput
          mode="outlined"
          label="BPM"
          style={styles.bpmText}
          dense={true}
          keyboardType="number-pad"
          value={innerBpmText.toString()}
          onChangeText={(t) => setInnerBpmText(t)}
          onEndEditing={(e) => {
            setInnerBpm(parseInt(e.nativeEvent.text, 10) || innerBpm);
            numpadOpened.current = false;
          }}
          onFocus={() => (numpadOpened.current = true)}
        />
        <FAB
          icon="plus"
          onPress={() => setInnerBpm(innerBpm + 1)}
          onLongPress={() => {
            longPress.current = true;
            onLongPress(innerBpm);
          }}
          onTouchEnd={() => (longPress.current = false)}
          small
        />
      </View>
      <View style={styles.fabView}>
        <FAB
          style={styles.fabMargin}
          icon="stop"
          onPress={() => onStopPress()}
          small
        />
        <FAB
          style={styles.fabMargin}
          icon={playIcon}
          onPress={() => onPlayPress()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    margin: 16,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bpmView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bpmText: {
    marginLeft: 8,
    marginRight: 8,
    minWidth: 64,
    marginBottom: 4,
    textAlign: 'center',
  },
  fabView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  fabMargin: {
    marginLeft: 8,
  },
});
export default BottomControls;
