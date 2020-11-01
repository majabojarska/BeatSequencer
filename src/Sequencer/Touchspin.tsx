import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import _ from 'lodash';
interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onUpdate: (value: number) => void;
}

const Touchspin = ({label, min, max, step, value, onUpdate}: Props) => {
  return (
    <View style={styles.view}>
      <IconButton
        icon="minus"
        onPress={() => onUpdate(_.clamp(value - step, min, max))}
      />
      <TextInput
        style={styles.input}
        label={label}
        value={value.toString()}
        mode="outlined"
        dense
        onEndEditing={(v) =>
          onUpdate(_.clamp(parseInt(v.nativeEvent.text, 10), min, max))
        }
      />
      <IconButton
        icon="plus"
        onPress={() => onUpdate(_.clamp(value + step, min, max))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginBottom: 4,
  },
});

export default Touchspin;
