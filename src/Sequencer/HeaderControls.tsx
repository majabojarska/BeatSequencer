import {sortedUniq} from 'lodash';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, IconButton, Portal, Button} from 'react-native-paper';
import SequenceManager from './core/SequenceManager';
import {NavigationProps} from './Sequencer';
import Touchspin from './Touchspin';

interface Props {
  sequenceManager: SequenceManager;
}

const HeaderControls = ({
  navigation,
  sequenceManager,
}: Props & NavigationProps) => {
  const [visible, setVisible] = useState(true);
  const [bars, setBars] = useState(sequenceManager.bars);
  const [beatsPerBar, setBeatsPerBar] = useState(sequenceManager.beatsPerBar);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.view}>
          <IconButton icon="music" size={20} onPress={() => setVisible(true)} />
        </View>
      ),
    });
  }, [navigation, visible]);

  const submit = useCallback(() => {
    sequenceManager.setSequenceLength(bars, beatsPerBar);
    setVisible(false);
  }, [bars, beatsPerBar, sequenceManager]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Sequence settings</Dialog.Title>
        <Dialog.Content>
          <Touchspin
            label="Bars"
            max={8}
            min={1}
            step={1}
            value={bars}
            onUpdate={(v) => setBars(v)}
          />
          <Touchspin
            label="Beats per bar"
            max={8}
            min={1}
            step={1}
            value={beatsPerBar}
            onUpdate={(v) => setBeatsPerBar(v)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={() => submit()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  touchspin: {
    flexDirection: 'row',
  },
});
export default HeaderControls;
