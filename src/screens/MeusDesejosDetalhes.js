import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import Desires from '../components/Desires';
import Container from '../components/Container';

export default function MeusDesejosDetalhes({route}) {
  return (
    <Container style={styles.container}>
      <Desires full item={route.params.item} />
    </Container>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
