import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {setMyDesires} from '../redux/actions';
import api from '../services/api';
import Product from './Product';
import ProductPicker from './ProductPicker';
import Button from './Button';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import ModalChildren from './ModalChildren';
import status from '../utils/desireStatus';
import {formatDate, formatCurrency} from '../utils/format';
import {maskCurrency, maskWhatsapp} from '../utils/masks';
import * as Yup from 'yup';
import {Formik} from 'formik';
import uuid from 'react-native-uuid';

const reservDesireFormSchema = Yup.object().shape({
  delivery_forecast: Yup.string().required('Campo obrigatório'),
  desired_image: Yup.object()
    .shape({
      uri: Yup.string().required('Imagem obrigatória'),
    })
    .typeError('Imagem obrigatória'),
});

const finishDesireFormSchema = Yup.object().shape({
  product_value: Yup.string().required('Campo obrigatório'),
});

function Desire({store, item, full, setMyDesires}) {
  const [itemDesire, setItemDesire] = useState(item);
  const [attemptedToReserv, setAttemptedToReserv] = useState(false);
  const [attemptedToFinishSale, setAttemptedToFinishSale] = useState(false);
  const [toggleCancelDesireModal, setToggleCancelDesireModal] = useState(false);
  const [toggleCancelReservationModal, setToggleCancelReservationModal] =
    useState(false);
  const [isProcessingModal, setIsProcessingModal] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitCancelDesire = async () => {
    try {
      setModalErrorMessage(null);
      setIsProcessingModal(true);

      const response = await api.put(`/desires/${itemDesire.id}/cancel`, {});
      const {desire} = response.data;

      const newDesires = [...store.myDesires].filter(d => d.id !== desire.id);
      setMyDesires([{...desire, uuid: uuid.v4()}, ...newDesires]);
      setItemDesire(desire);
      setIsProcessingModal(false);
      setToggleCancelDesireModal(false);
    } catch (response) {
      setModalErrorMessage(
        'Houve um erro ao tentar cancelar, deseja tentar novamente?',
      );
      setIsProcessingModal(false);
    }
  };

  const onSubmitCancelReservation = async () => {
    try {
      setModalErrorMessage(null);
      setIsProcessingModal(true);

      const response = await api.put(
        `/desires/${itemDesire.id}/cancel-reservation`,
        {},
      );
      const {desire} = response.data;

      const newDesires = [...store.myDesires].filter(d => d.id !== desire.id);
      setMyDesires([{...desire, uuid: uuid.v4()}, ...newDesires]);
      setItemDesire(desire);
      setIsProcessingModal(false);
      setToggleCancelReservationModal(false);
    } catch (response) {
      setModalErrorMessage(
        'Houve um erro ao tentar cancelar a reserva, deseja tentar novamente?',
      );
      setIsProcessingModal(false);
    }
  };

  const onSubmitReservDesire = async (values, {setSubmitting, resetForm}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      let formData = new FormData();
      formData.append('delivery_forecast', values.delivery_forecast);
      formData.append('desired_image', values.desired_image);

      const response = await api.put(
        `/desires/${itemDesire.id}/reserv`,
        formData,
      );

      const {desire} = response.data;

      setSubmitting(false);
      const newDesires = [...store.myDesires].filter(d => d.id !== desire.id);
      setMyDesires([{...desire, uuid: uuid.v4()}, ...newDesires]);
      setItemDesire(desire);
      resetForm({});
      setAttemptedToReserv(false);
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Houve um erro inesperado, tente novamente');
      }
      setSubmitting(false);
    }
  };

  const onSubmitFinishDesire = async (values, {setSubmitting, resetForm}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      const response = await api.put(`/desires/${itemDesire.id}/finish`, {
        product_value: values.product_value,
      });

      const {desire} = response.data;

      setSubmitting(false);
      const newDesires = [...store.myDesires].filter(d => d.id !== desire.id);
      setMyDesires([{...desire, uuid: uuid.v4()}, ...newDesires]);
      setItemDesire(desire);
      resetForm({});
      attemptedToFinishSale(false);
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Houve um erro inesperado, tente novamente');
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <View style={[styles.container, {marginBottom: full ? 0 : 12}]}>
        <Text style={styles.cardTitle}>{itemDesire.customer.name}</Text>
        <View style={[styles.itemRow, styles.spacingTop]}>
          <FontAwesome name="whatsapp" size={19} color={'#979191'} />
          <View
            style={[
              styles.itemRow,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={styles.text}>
              {maskWhatsapp(itemDesire.customer.whatsapp)}
            </Text>
            <Text
              style={[styles.status, {color: status[itemDesire.status].color}]}>
              {status[itemDesire.status].name}
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
          <Text style={styles.text}>{itemDesire.name}</Text>
        </View>
        {full && (
          <>
            {itemDesire.customer?.email && (
              <View
                style={[
                  styles.itemRow,
                  styles.spacingTop,
                  {
                    marginBottom: full ? 0 : 12,
                  },
                ]}>
                <FontAwesome name="envelope" size={17} color={'#979191'} />
                <Text style={styles.text}>{itemDesire.customer.email}</Text>
              </View>
            )}
            {itemDesire.user_reserved?.store?.name && (
              <View style={[styles.itemRow, styles.spacingTop]}>
                <FontAwesome5 name="store" size={15} color={'#979191'} />

                <Text style={styles.text}>
                  {itemDesire.user_reserved.store.name}
                </Text>
              </View>
            )}
            <View style={styles.spacingTop}>
              <Text style={styles.sectionTitle}>Complementos</Text>
              <Text style={[styles.text, {marginLeft: 0}]}>
                {itemDesire.complements}
              </Text>
            </View>

            <View style={styles.spacingTop}>
              <Text style={styles.sectionTitle}>Data de cadastro</Text>
              <View style={styles.itemRow}>
                <Fontisto name="clock" size={16} color={'#979191'} />
                <Text style={styles.text}>
                  {formatDate(itemDesire.created_at)}
                </Text>
              </View>
            </View>
            {itemDesire.status >= 2 && itemDesire.delivery_forecast && (
              <View style={styles.spacingTop}>
                <Text style={styles.sectionTitle}>Previsão de entrega</Text>
                <View style={styles.itemRow}>
                  <Fontisto name="clock" size={16} color={'#979191'} />
                  <Text style={styles.text}>
                    {formatDate(itemDesire.delivery_forecast)}
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

          {itemDesire.status >= 5 && (
            <>
              <View style={styles.largeSpacingTop} />
              <View style={styles.container}>
                <Text style={styles.cardTitle}>Detalhes da Venda</Text>
                {itemDesire?.user_origin?.name && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Vendedor de Origem</Text>
                    <View style={styles.itemRow}>
                      <FontAwesome name="user" size={18} color={'#979191'} />
                      <Text style={styles.text}>
                        {itemDesire.user_origin.name}
                      </Text>
                    </View>
                  </View>
                )}
                {itemDesire?.user_reserved?.name && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Vendedor da Reserva</Text>
                    <View style={styles.itemRow}>
                      <FontAwesome name="user" size={18} color={'#979191'} />
                      <Text style={styles.text}>
                        {itemDesire.user_reserved.name}
                      </Text>
                    </View>
                  </View>
                )}
                {itemDesire.product_value && (
                  <View style={styles.spacingTop}>
                    <Text style={styles.sectionTitle}>Valor do Produto</Text>
                    <Text style={[styles.text, {marginLeft: 0}]}>
                      {formatCurrency(itemDesire.product_value)}
                    </Text>
                  </View>
                )}
                <View style={styles.largeSpacingTop} />
              </View>
            </>
          )}

          {!!itemDesire?.original_image && (
            <Product
              text={'Produto Original'}
              image={itemDesire.original_image}
            />
          )}

          {!!itemDesire?.desired_image && (
            <Product
              text={'Produto Desejado'}
              image={itemDesire.desired_image}
            />
          )}

          {attemptedToReserv && (
            <>
              <Formik
                initialValues={{
                  delivery_forecast: '',
                  desired_image: null,
                }}
                onSubmit={onSubmitReservDesire}
                validationSchema={reservDesireFormSchema}>
                {({
                  values,
                  errors,
                  isSubmitting,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  handleSubmit,
                }) => (
                  <>
                    <ProductPicker
                      text={
                        'Tire uma foto do produto \n ou da etiqueta a ser reservada'
                      }
                      value={values.desired_image}
                      onChange={value => {
                        setFieldValue('desired_image', value);
                        setFieldTouched('desired_image', true);
                      }}
                      errorMessage={
                        touched?.desired_image &&
                        errors?.desired_image &&
                        errors.desired_image
                      }
                    />
                    <View style={styles.largeSpacingTop} />
                    <Input
                      type="primary"
                      label={'Data prevista para entrega'}
                      value={values.delivery_forecast}
                      onChangeDate={value => {
                        setFieldValue('delivery_forecast', formatDate(value));
                        setFieldTouched('delivery_forecast', true);
                      }}
                      errorMessage={
                        touched?.delivery_forecast &&
                        errors?.delivery_forecast &&
                        errors.delivery_forecast
                      }
                      dateTimePickerProps={{
                        mode: 'datetime',
                      }}
                    />

                    <View style={styles.errorContainer}>
                      <ErrorMessage message={errorMessage} />
                    </View>

                    <Button
                      type="primary"
                      text={'Confirmar Reserva'}
                      onPress={handleSubmit}
                      loading={isSubmitting}
                    />
                  </>
                )}
              </Formik>
            </>
          )}

          {itemDesire.status === 1 && (
            <>
              <View style={styles.largeSpacingTop} />
              {!attemptedToReserv && (
                <Button
                  type="primary"
                  text={'Reservar Desejo'}
                  onPress={() => setAttemptedToReserv(true)}
                />
              )}
              {itemDesire.user_origin?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button
                    type="secondary"
                    text={'Cancelar Desejo'}
                    onPress={() => setToggleCancelDesireModal(true)}
                  />
                  <Modal
                    transparent={true}
                    visible={toggleCancelDesireModal}
                    onRequestClose={() => setToggleCancelDesireModal(false)}>
                    <ModalChildren
                      text="Você tem certeza que deseja cancelar o desejo?"
                      onAction={async action => {
                        if (action === true) {
                          await onSubmitCancelDesire();
                        } else {
                          setToggleCancelDesireModal(false);
                        }
                      }}
                      errorMessage={modalErrorMessage}
                      isProcessing={isProcessingModal}
                      isProcessingMessage="Cancelando Desejo"
                    />
                  </Modal>
                </>
              )}
            </>
          )}

          {itemDesire.status === 2 && (
            <>
              {itemDesire.user_origin?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button type="primary" text={'Comunicar ao Cliente'} />
                </>
              )}

              {itemDesire.user_reserved?.id === store.user.id && (
                <>
                  <View style={styles.largeSpacingTop} />
                  <Button
                    type="secondary"
                    text={'Cancelar Reserva'}
                    onPress={() => setToggleCancelReservationModal(true)}
                  />
                  <Modal
                    transparent={true}
                    visible={toggleCancelReservationModal}
                    onRequestClose={() =>
                      setToggleCancelReservationModal(false)
                    }>
                    <ModalChildren
                      text="Você tem certeza que deseja cancelar a reserva?"
                      onAction={async action => {
                        if (action === true) {
                          await onSubmitCancelReservation();
                        } else {
                          setToggleCancelReservationModal(false);
                        }
                      }}
                      errorMessage={modalErrorMessage}
                      isProcessing={isProcessingModal}
                      isProcessingMessage="Cancelando Reserva"
                    />
                  </Modal>
                </>
              )}
            </>
          )}

          {itemDesire.status === 4 && (
            <>
              {/* TODO: O botão de finalizar venda aparecerá somente para o vendedor que o cliente escolheu no Whatsapp */}
              <>
                <View style={styles.largeSpacingTop} />
                {attemptedToFinishSale ? (
                  <>
                    <Formik
                      initialValues={{
                        product_value: '',
                      }}
                      onSubmit={onSubmitFinishDesire}
                      validationSchema={finishDesireFormSchema}>
                      {({
                        values,
                        errors,
                        isSubmitting,
                        touched,
                        setFieldValue,
                        setFieldTouched,
                        handleSubmit,
                      }) => (
                        <>
                          <Input
                            type="primary"
                            label={'Valor do produto'}
                            currency
                            value={values.product_value}
                            onChangeText={text => {
                              const formatedText = maskCurrency(text);
                              setFieldValue('product_value', formatedText);
                              setFieldTouched('product_value', true);
                            }}
                            maxLength={10}
                            errorMessage={
                              touched?.product_value &&
                              errors?.product_value &&
                              errors.product_value
                            }
                          />
                          <View style={styles.largeSpacingTop} />

                          <View style={styles.errorContainer}>
                            <ErrorMessage message={errorMessage} />
                          </View>

                          <Button
                            type="primary"
                            text={'Confirmar Finalização da Venda'}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                          />
                        </>
                      )}
                    </Formik>
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
  errorContainer: {
    marginBottom: 14,
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setMyDesires})(Desire);
