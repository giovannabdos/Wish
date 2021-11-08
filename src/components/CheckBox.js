import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CheckBoxCore from '@react-native-community/checkbox';
import ErrorMessage from './ErrorMessage';

export default function CheckBox({
  label,
  initialValue,
  onChange,
  disabled = false,
  errorMessage,
}) {
  const [value, setValue] = useState(initialValue);

  const onValueChange = newValue => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <View style={styles.containerCheckbox}>
        <CheckBoxCore
          disabled={disabled}
          value={value}
          onValueChange={onValueChange}
          tintColors={{true: '#193E5B'}}
        />
        <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
          <Text
            style={[
              styles.label,
              {color: !!errorMessage ? '#DD2C00' : '#000'},
            ]}>
            {label}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
}

const styles = StyleSheet.create({
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
});
