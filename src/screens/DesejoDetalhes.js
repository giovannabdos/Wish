import React from 'react';
import {StyleSheet} from 'react-native';
import Desire from '../components/Desire';
import Container from '../components/Container';

export default function DesejoDetalhes({route}) {
  return (
    <Container style={styles.container}>
      <Desire full item={route.params.item} />
    </Container>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
