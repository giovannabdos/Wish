import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function OutrosDesejos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todos os status</Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={35}
        color="#000000"
        style={{marginTop: 10, marginBottom: 10, marginRight: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Montserrat',
    fontSize: 16,
    marginLeft: 14,
  },
});
