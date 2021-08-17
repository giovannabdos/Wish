import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Product from './Product';
import ProductPicker from './ProductPicker';
import Button from './Button';
import Input from './Input';
import status from '../utils/desireStatus';
import {formatDate, formatCurrency} from '../utils/format';

function Desire({store, item, full}) {
  const [attemptedToReserv, setAttemptedToReserv] = useState(false);
  const [attemptedToFinishSale, setAttemptedToFinishSale] = useState(false);

  return (
    <>
      <View style={[styles.container, {marginBottom: full ? 0 : 12}]}>
        <Text style={styles.cardTitle}>{item.customer.name}</Text>
        <View style={[styles.itemRow, styles.spacingTop]}>
          <FontAwesome name="whatsapp" size={19} color={'#979191'} />
          <View
            style={[
              styles.itemRow,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={styles.text}>{item.customer.whatsapp}</Text>
            <Text style={[styles.status, {color: status[item.status].color}]}>
              {status[item.status].name}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.itemRow,
            styles.spacingTop,
            {
              marginBottom: full ? 0 : 12,
            },
          ]}>
          <FontAwesome name="heart" size={17} color={'#979191'} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        {full && (
          <>
            {item.customer?.email && (
              <View
                style={[
                  styles.itemRow,
                  styles.spacingTop,
                  {
                    marginBottom: full ? 0 : 12,
                  },
                ]}>
                <FontAwesome name="envelope" size={17} color={'#979191'} />
                <Text style={styles.text}>{item.customer.email}</Text>
              </View>
            )}
            {item.user_reserved?.store?.name && (
              <View style={[styles.itemRow, styles.spacingTop]}>
                <FontAwesome5 name="store" size={15} color={'#979191'} />

                <Text style={styles.text}>{item.user_reserved.store.name}</Text>
              </View>
            )}
            <View style={styles.spacingTop}>
              <Text style={styles.sectionTitle}>Complementos</Text>
              <Text style={[styles.text, {marginLeft: 0}]}>
                {item.complements}
              </Text>
            </View>

            <View style={styles.spacingTop}>
              <Text style={styles.sectionTitle}>Data de cadastro</Text>
              <View style={styles.itemRow}>
                <Fontisto name="clock" size={16} color={'#979191'} />
                <Text style={styles.text}>{formatDate(item.created_at)}</Text>
              </View>
            </View>
            {item.status >= 2 && item.delivery_forecast && (
              <View style={styles.spacingTop}>
                <Text style={styles.sectionTitle}>Previsão de entrega</Text>
                <View style={styles.itemRow}>
                  <Fontisto name="clock" size={16} color={'#979191'} />
                  <Text style={styles.text}>
                    {formatDate(item.delivery_forecast)}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.largeSpacingTop} />
          </>
        )}
      </View>
      {full && (
        <>
          {/* TODO: Caso o status seja maior ou igual a 4 (Respondido pelo cliente), Fazer uma seção para mostrar o que o cliente respondeu */}

          {item.status >= 5 && (
            <>
              <View style={styles.largeSpacingTop} />
              <View style={styles.container}>
                <Text style={styles.cardTitle}>Detalhes da Venda</Text>
                {item?.user_origin?.name && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Vendedor de Origem</Text>
                    <View style={styles.itemRow}>
                      <FontAwesome name="user" size={18} color={'#979191'} />
                      <Text style={styles.text}>{item.user_origin.name}</Text>
                    </View>
                  </View>
                )}
                {item?.user_reserved?.name && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Vendedor da Reserva</Text>
                    <View style={styles.itemRow}>
                      <FontAwesome name="user" size={18} color={'#979191'} />
                      <Text style={styles.text}>{item.user_reserved.name}</Text>
                    </View>
                  </View>
                )}
                {item.product_value && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Valor do Produto</Text>
                    <Text style={[styles.text, {marginLeft: 0}]}>
                      {formatCurrency(item.product_value)}
                    </Text>
                  </View>
                )}
                <View style={styles.largeSpacingTop} />
              </View>
            </>
          )}

          {!!item?.original_image && (
            <Product text={'Produto Original'} image={item.original_image} />
          )}

          {!!item?.desired_image && (
            <Product text={'Produto Desejado'} image={item.desired_image} />
          )}

          {attemptedToReserv && (
            <>
              <ProductPicker />
              <View style={styles.largeSpacingTop} />
              <Input type="primary" label={'Data prevista para entrega'} />
            </>
          )}

          {item.status === 1 && (
            <>
              <View style={styles.largeSpacingTop} />
              {attemptedToReserv ? (
                <Button type="primary" text={'Confirmar Reserva'} />
              ) : (
                <Button
                  type="primary"
                  text={'Reservar Desejo'}
                  onPress={() => setAttemptedToReserv(true)}
                />
              )}
              {item.user_origin?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button type="secondary" text={'Cancelar Desejo'} />
                </>
              )}
            </>
          )}

          {item.status === 2 && (
            <>
              {item.user_origin?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button type="primary" text={'Comunicar ao Cliente'} />
                </>
              )}

              {item.user_reserved?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button type="secondary" text={'Cancelar Reserva'} />
                </>
              )}
            </>
          )}

          {item.status === 4 && (
            <>
              {/* TODO: O botão de finalizar venda aparecerá somente para o vendedor que o cliente escolheu no Whatsapp */}
              <>
                <View style={styles.largeSpacingTop} />
                {attemptedToFinishSale ? (
                  <>
                    <Input type="primary" label={'Valor do produto'} />
                    <View style={styles.largeSpacingTop} />
                    <Button
                      type="primary"
                      text={'Confirmar Finalização da Venda'}
                    />
                  </>
                ) : (
                  <Button
                    type="primary"
                    text={'Finalizar Venda'}
                    onPress={() => setAttemptedToFinishSale(true)}
                  />
                )}
              </>
            </>
          )}

          <View style={styles.largeSpacingTop} />
          <View style={styles.largeSpacingTop} />
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
  },
  cardTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacingTop: {
    marginTop: 5,
  },
  largeSpacingTop: {
    marginTop: 10,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 7,
    alignItems: 'center',
  },
  status: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {})(Desire);
