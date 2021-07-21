import React, {useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Desires from '../components/Desires';
import Container from '../components/Container';

export default function MeusDesejos({navigation}) {
  const [desires, setDesires] = useState([
    {
      id: 1,
      name: 'Blusão Masculino',
      customer: {
        name: 'Wellington Gomes Graciani',
        email: 'wellingtongg12@gmail.com',
        whatsapp: '(24) 99266-4178',
      },
      store: {
        name: 'Loja A',
      },
      status: 'opened',
      original_image:
        'https://rovitex.vteximg.com.br/arquivos/ids/313007-1000-1000/Blusao-Masculino-Manga-Longa-Rovitex-Verde.jpg?v=637508258260900000',
      desired_image: null,
      complements: 'Tamanho M, Cor azul escuro',
      delivery_forecast: '08/07/2021 17:30',
      created_at: '04/07/2021 15:00',
    },
    {
      id: 2,
      name: 'Moletom',
      customer: {
        name: 'Giovanna Batista do Sacramento',
        email: 'gile-2008@hotmail.com',
        whatsapp: '(48) 99660-2509',
      },
      store: {
        name: 'Loja B',
      },
      status: 'reserved',
      original_image:
        'https://http2.mlstatic.com/D_NQ_NP_974927-MLB44000017603_112020-W.jpg',
      desired_image:
        'https://cdn.iset.io/assets/53692/produtos/1231/thumb_450-450-moletom-gap-feminino-zip-vinho.jpg',
      complements: 'Tamanho P, Cor roxo',
      delivery_forecast: '23/09/2021 17:45',
      created_at: '15/09/2021 17:00',
    },
  ]);

  return (
    <Container style={styles.container}>
      <FlatList
        data={desires}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Desejos', {item})}>
            <Desires item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
