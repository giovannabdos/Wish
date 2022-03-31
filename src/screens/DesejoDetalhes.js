import React from 'react';
import Desire from '../components/Desire';
import Container from '../components/Container';

export default function DesejoDetalhes({route}) {
  return (
    <Container>
      <Desire full item={route.params.item} />
    </Container>
  );
}
