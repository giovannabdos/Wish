import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Product from './Product';
import ProductPicker from './ProductPicker';
import status from '../utils/desireStatus';

export default function Desire({item, full}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title1}>{item.customer.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome name="whatsapp" size={19} color={'#979191'} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <Text style={styles.text}>{item.customer.whatsapp}</Text>
            <Text style={[styles.status, {color: status[item.status].color}]}>
              {status[item.status].name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: full ? 0 : 12,
            alignItems: 'center',
          }}>
          <FontAwesome name="heart" size={17} color={'#979191'} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        {full && (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <FontAwesome5 name="store" size={15} color={'#979191'} />
              <Text style={styles.text6}>{item.store.name}</Text>
            </View>
            <Text style={styles.title2}>Complementos</Text>
            <Text style={styles.description}>{item.complements}</Text>
            <Text style={styles.title2}>Data de cadastro</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Fontisto name="clock" size={16} color={'#979191'} />
              <Text style={styles.text2}>{item.created_at}</Text>
            </View>
            <Text style={styles.title2}>Previsão de Entrega</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Fontisto name="clock" size={16} color={'#979191'} />
              <Text style={styles.text3}>{item.delivery_forecast}</Text>
            </View>
          </>
        )}
      </View>
      {full && (
        <>
          <Product text={'Produto Original'} image={item.original_image} />
          <View style={{marginBottom: 50}}>
            <ProductPicker />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 7,
    alignItems: 'center',
  },
  title1: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  title2: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    marginTop: 5,
  },
  text2: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 5.25,
  },
  text3: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 5.25,
    marginBottom: 6,
  },
  description: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  text6: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 7,
  },
  status: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
});
