import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, IconButton, Portal, Button} from 'react-native-paper';
import {NavigationProps} from './Piano';
import Touchspin from '../Common/Touchspin';
import InstrumentMenu from './InstrumentMenu';

interface Props {
  keyScale: number;
  instrumentName: string;
  instrumentNames: Array<string>;
  onUpdate: (instrumentName: string, keyScale: number) => void;
}

const HeaderControls = ({
  navigation,
  keyScale,
  instrumentNames,
  instrumentName,
  onUpdate,
}: Props & NavigationProps) => {
  const [visible, setVisible] = useState(false);
  const [innerKeyScale, setInnerKeyScale] = useState(keyScale);
  const [innerInstrumentName, setInnerInstrumentName] = useState(
    instrumentName,
  );

  useEffect(() => {
    setInnerInstrumentName(instrumentName);
  }, [instrumentName]);

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
    setVisible(false);
    onUpdate(innerInstrumentName, innerKeyScale);
  }, [innerInstrumentName, innerKeyScale, onUpdate]);

  const cancel = useCallback(() => {
    setVisible(false);
    setInnerKeyScale(innerKeyScale);
  }, [innerKeyScale]);

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Dialog.Title>Piano settings</Dialog.Title>
        <Dialog.Content>
          <InstrumentMenu
            items={instrumentNames}
            value={innerInstrumentName}
            onUpdate={(v) => setInnerInstrumentName(v)}
          />
          <Touchspin
            label="Key width"
            max={3}
            min={1}
            step={0.25}
            value={innerKeyScale}
            onUpdate={(v) => setInnerKeyScale(v)}
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
  view: {},
  touchspin: {},
  dialog: {
    minWidth: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default HeaderControls;
