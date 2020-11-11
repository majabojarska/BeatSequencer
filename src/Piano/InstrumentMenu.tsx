import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu, TextInput} from 'react-native-paper';

interface Props {
  items: Array<string>;
  value: string;
  onUpdate: (name: string) => void;
}

const InstrumentMenu = (props: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  };

  function onSelect(name: string) {
    closeMenu();
    props.onUpdate(name);
  }

  return (
    <View style={styles.menu}>
      <Menu
        visible={menuVisible}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <TextInput
              label="Instrument"
              mode="outlined"
              value={props.value}
              onChangeText={undefined}
              editable={false}
              dense={true}
              style={styles.input}
            />
          </TouchableOpacity>
        }
        onDismiss={closeMenu}>
        {props.items.map((name, i) => (
          <Menu.Item
            title={name}
            key={i}
            onPress={() => {
              onSelect(name);
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  input: {marginBottom: 4, width: '100%'},
});

export default InstrumentMenu;
