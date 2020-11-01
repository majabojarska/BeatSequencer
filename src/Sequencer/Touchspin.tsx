import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
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
  const [innerVal, setInnerVal] = useState('');
  useEffect(() => {
    setInnerVal(value.toString());
  }, [value]);

  return (
    <View style={styles.view}>
      <IconButton
        icon="minus"
        onPress={() => onUpdate(_.clamp(value - step, min, max))}
      />
      <TextInput
        style={styles.input}
        label={label}
        value={innerVal}
        mode="outlined"
        dense
        keyboardType="number-pad"
        onChangeText={(t) => setInnerVal(t)}
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
