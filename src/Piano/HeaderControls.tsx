import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, IconButton, Portal, Button, Menu} from 'react-native-paper';
import {NavigationProps} from './Piano';
import Touchspin from '../Common/Touchspin';
import PianoManager from './core/PianoManager';
import {findLastIndex} from 'lodash';
import InstrumentMenu from './InstrumentMenu';

interface Props {
  pianoManager: PianoManager;
  keyWidthScale: number;
  instrumentNames: Array<string>;
  onInstrumentNameChange: (name: string)=>void;
  onKeyWidthScaleChange: (scale: number) => void;
  onUpdate: () => void;
}

const HeaderControls = ({
  navigation,
  pianoManager,
  keyWidthScale,
  instrumentNames,
  onInstrumentNameChange,
  onKeyWidthScaleChange,
  onUpdate,
}: Props & NavigationProps) => {
  const [visible, setVisible] = useState(false);
  const [_keyWidthScale, setKeyWidthScale] = useState(keyWidthScale);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.view}>
          <IconButton icon="music" size={24} onPress={() => setVisible(true)} />
        </View>
      ),
      headerLeft: () => (
        <View style={styles.view}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
    });
  }, [navigation, visible]);

  const submit = useCallback(() => {
    onKeyWidthScaleChange(_keyWidthScale);
    setVisible(false);
    onUpdate();
  }, [_keyWidthScale, pianoManager, onUpdate]);

  const cancel = useCallback(() => {
    setVisible(false);
    setKeyWidthScale(keyWidthScale);
  }, [_keyWidthScale]);

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Dialog.Title>Piano settings</Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Touchspin
            label="Key width"
            max={3}
            min={1}
            step={0.25}
            value={_keyWidthScale} // Bind to state
            onUpdate={(v) => {
              setKeyWidthScale(v);
            }} // Bind to update func
          />
          <InstrumentMenu
            // pianoManager={pianoManager}
            onInstrumentNameChange={onInstrumentNameChange}
            instrumentNames={instrumentNames}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => cancel()}>Cancel</Button>
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
  dialog: {
    minWidth: 300,
    alignSelf: 'center',
  },
  dialogContent: {},
});
export default HeaderControls;
