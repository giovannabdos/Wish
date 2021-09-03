import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ErrorMessage from './ErrorMessage';

export default function Input({
  label,
  secureTextEntry,
  type,
  errorMessage,
  dateTimePickerProps,
  onChangeDate,
  ...props
}) {
  const [color, setColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#979191');
  const [errorColor, setErrorColor] = useState('#dd2c00');
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const InputContainer = dateTimePickerProps ? TouchableOpacity : View;

  useEffect(() => {
    if (type === 'secondary') {
      setColor('#FFFFFF');
      setBorderColor('#ffffff');
      setErrorColor('#FF80AB');
    }
  }, []);

  return (
    <View>
      <Text
        style={[styles.label, {color: !!errorMessage ? errorColor : color}]}>
        {label}
      </Text>
      <InputContainer
        style={styles.inputContainer}
        onPress={() => setIsDateTimePickerVisible(true)}>
        <TextInput
          style={[
            styles.input,
            {borderColor: !!errorMessage ? errorColor : borderColor, color},
          ]}
          secureTextEntry={secureTextEntry}
          editable={!dateTimePickerProps}
          {...props}
        />
        {dateTimePickerProps && (
          <View style={styles.dateTimePickerIcon}>
            <FontAwesome5 name="calendar" size={19} color={'#193E5B'} />
          </View>
        )}
      </InputContainer>
      {dateTimePickerProps && (
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          onConfirm={value => {
            onChangeDate(value);
            setIsDateTimePickerVisible(false);
          }}
          onCancel={() => setIsDateTimePickerVisible(false)}
          {...dateTimePickerProps}
        />
      )}
      {!!errorMessage && (
        <View style={styles.errorMessageContainer}>
          <ErrorMessage type={type} message={errorMessage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#979191',
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 3,
    fontFamily: 'Montserrat',
    textAlignVertical: 'top',
  },
  dateTimePickerIcon: {
    position: 'absolute',
    right: 8,
  },
  errorMessageContainer: {
    marginTop: 3,
  },
});
