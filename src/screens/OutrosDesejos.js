import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Container from '../components/Container';

export default function OutrosDesejos() {
  return (
    <Container style={styles.container}>
      <Text style={{fontSize: 50, fontFamily: 'Montserrat'}}></Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
