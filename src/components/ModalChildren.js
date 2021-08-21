import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function ModalChildren({
  text,
  onAction,
  errorMessage,
  isProcessing,
  isProcessingMessage,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {isProcessing ? (
          <>
            <Text style={[styles.text, styles.isProcessingMessage]}>
              {isProcessingMessage}
            </Text>
            <ActivityIndicator color={'#193E5B'} size={24} />
          </>
        ) : (
          <>
            <Text
              style={[
                styles.text,
                {color: !!errorMessage ? '#dd2c00' : '#000'},
              ]}>
              {!!errorMessage ? errorMessage : text}
            </Text>
            <View style={styles.actions}>
              <TouchableWithoutFeedback onPress={() => onAction(false)}>
                <Text style={[styles.actionText, styles.flexCentered]}>
                  Não
                </Text>
              </TouchableWithoutFeedback>
              <Text style={[styles.actionText, styles.divider]}>|</Text>
              <TouchableWithoutFeedback onPress={() => onAction(true)}>
                <Text
                  style={[
                    styles.actionText,
                    styles.flexCentered,
                    styles.redColor,
                  ]}>
                  Sim
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: width <= 324 ? width - 24 : 300,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
  },
  isProcessingMessage: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  actionText: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
  flexCentered: {
    flex: 1,
    textAlign: 'center',
  },
  redColor: {
    color: '#dd2c00',
  },
  divider: {
    color: '#C4C4C4',
  },
});
