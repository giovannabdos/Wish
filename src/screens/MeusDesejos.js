import React, {useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Desire from '../components/Desire';
import Container from '../components/Container';
import Select from '../components/Select';

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
      status: 1,
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
      status: 2,
      original_image:
        'https://http2.mlstatic.com/D_NQ_NP_974927-MLB44000017603_112020-W.jpg',
      desired_image:
        'https://cdn.iset.io/assets/53692/produtos/1231/thumb_450-450-moletom-gap-feminino-zip-vinho.jpg',
      complements: 'Tamanho P, Cor roxo',
      delivery_forecast: '23/09/2021 17:45',
      created_at: '15/09/2021 17:00',
    },
    {
      id: 3,
      name: 'Casaco Masculino',
      customer: {
        name: 'Cid dos Santos',
        email: '...',
        whatsapp: '(21) 99999-9999 ',
      },
      store: {
        name: 'Loja C',
      },
      status: 5,
      original_image:
        'https://static.netshoes.com.br/produtos/blusa-moletom-algodao-aberto-mooboo-c-bolso-e-capuz/06/38B-0000-006/38B-0000-006_zoom1.jpg?ts=1617839559&',
      desired_image:
        'https://static.netshoes.com.br/produtos/moletom-com-ziper-jon-cotre-unissex/10/19H-0026-010/19H-0026-010_zoom1.jpg?ts=1622196629&',
      complements: 'Tamanho G, Cor cinza',
      delivery_forecast: '12/10/2021 17:45',
      created_at: '01/10/2021 13:00',
    },
    {
      id: 4,
      name: 'Moletom Masculino',
      customer: {
        name: 'Cid dos Santos',
        email: '...',
        whatsapp: '(21) 99999-9999 ',
      },
      store: {
        name: 'Loja C',
      },
      status: 3,
      original_image:
        'https://img.ltwebstatic.com/images3_pi/2021/01/05/1609818875fd26798461ba635033de9078f8a0e903_thumbnail_600x.webp',
      desired_image:
        'https://img.ltwebstatic.com/images3_pi/2021/01/27/16117165617949efdb6caecde04166dcbb7c136e07_thumbnail_600x.webp',
      complements: 'Tamanho M, Cor Verde',
      delivery_forecast: '19/08/2021 15:45',
      created_at: '05/08/2021 10:00',
    },
    {
      id: 5,
      name: 'Casaco Masculino',
      customer: {
        name: 'Cid dos Santos',
        email: '...',
        whatsapp: '(21) 99999-9999 ',
      },
      store: {
        name: 'Loja C',
      },
      status: 6,
      original_image:
        'https://img.ltwebstatic.com/images3_pi/2021/01/05/160983295658efc31ecdd3c6f518d42c60dcf0f47c_thumbnail_600x.webp',
      desired_image:
        'https://img.ltwebstatic.com/images3_pi/2021/01/05/160983295658efc31ecdd3c6f518d42c60dcf0f47c_thumbnail_600x.webp',
      complements: 'Tamanho G, Cor azul',
      delivery_forecast: '10/09/2021 17:45',
      created_at: '25/08/2021 13:00',
    },
  ]);

  return (
    <Container style={styles.container}>
      <Select />
      <FlatList
        data={desires}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Desejos', {item})}>
            <Desire item={item} />
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
