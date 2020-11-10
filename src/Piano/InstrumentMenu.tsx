import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Menu} from 'react-native-paper';
import PianoManager from './core/PianoManager';

interface Props {
  instrumentNames: Array<string>;
  onInstrumentNameChange: (name: string) => void;
}

const InstrumentMenu = (props: Props) => {
  const [menuVisible, setInstrumentMenuVisible] = useState(false);

  const openMenu = () => {
    setInstrumentMenuVisible(true);
  };

  const closeMenu = () => {
    setInstrumentMenuVisible(false);
  };

  function onInstrumentSelect(name: string) {
    closeMenu();
    props.onInstrumentNameChange(name);
  }

  return (
    <Menu
      visible={menuVisible}
      anchor={<Button onPress={openMenu}>Select instrument</Button>}
      onDismiss={closeMenu}
      style={styles.menu}>
      {props.instrumentNames.map((name, i) => (
        <Menu.Item
          title={name}
          key={i}
          onPress={() => {
            onInstrumentSelect(name);
          }}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {minWidth: 250},
});

export default InstrumentMenu;
