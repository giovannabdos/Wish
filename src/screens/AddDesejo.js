import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {setMyDesires} from '../redux/actions';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import ProductPicker from '../components/ProductPicker';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';
import {maskWhatsapp} from '../utils/masks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';

const customerFormSchema = Yup.object().shape({
  whatsapp: Yup.string()
    .min(14, 'Número iválido')
    .max(15, 'Número inválido')
    .required('Campo obrigatório'),
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').nullable().notRequired(),
});

const desireFormSchema = Yup.object().shape({
  desire: Yup.string().required('Campo obrigatório'),
  complements: Yup.string().required('Campo obrigatório'),
  original_image: Yup.object()
    .shape({
      uri: Yup.string().required('Imagem obrigatória'),
    })
    .typeError('Imagem obrigatória'),
});

function AddDesejo({store, navigation, setMyDesires}) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitCustomer = async (values, {setSubmitting}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      if (store.user?.store?.brand?.id) {
        values = {...values, brand_id: store.user?.store?.brand?.id};
      } else {
        throw Error();
      }

      const response = await api.post('/customers', values);

      const {customer_id} = response.data;

      setCustomer({
        id: customer_id,
        ...values,
      });
      setSubmitting(false);
      setStep(2);
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Houve um erro inesperado, tente novamente');
      }
      setSubmitting(false);
    }
  };

  const onSubmitDesire = async (values, {setSubmitting, resetForm}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      let formData = new FormData();
      formData.append('name', values.desire);
      formData.append('complements', values.complements.trim());
      formData.append('customer_id', customer.id);
      formData.append('original_image', values.original_image);

      const response = await api.post('/desires', formData);

      const {desire} = response.data;

      setSubmitting(false);
      setMyDesires([{...desire, uuid: uuid.v4()}, ...store.myDesires]);
      resetForm({});
      setCustomer(null);
      setStep(1);
      navigation.navigate('Meus Desejos');
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Houve um erro inesperado, tente novamente');
      }
      setSubmitting(false);
    }
  };

  const searchCustomers = async whatsapp => {
    try {
      const response = await api.get(`/customers/search?whatsapp=${whatsapp}`);

      const {customers} = response.data;

      setCustomers(customers);
      setShowSearch(true);
    } catch (response) {}
  };

  const handleOnSelectCustomer = (c, setFieldValue) => {
    setFieldValue('whatsapp', maskWhatsapp(c.whatsapp));
    setFieldValue('name', c.name);
    setFieldValue('email', c.email);
    setShowSearch(false);
  };

  return (
    <Container>
      {step === 1 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <View style={styles.elipseCheia}></View>
            <View style={styles.line}></View>
            <View style={styles.elipseVazia}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.customer}>Cliente</Text>
            <Text style={styles.desejo}>Desejo</Text>
          </View>
          <Formik
            initialValues={customer || {whatsapp: '', name: '', email: null}}
            onSubmit={onSubmitCustomer}
            validationSchema={customerFormSchema}>
            {({
              values,
              errors,
              isSubmitting,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <View style={{marginBottom: 14}}>
                  <Input
                    type="primary"
                    label={'Whatsapp'}
                    value={values.whatsapp}
                    onChangeText={text => {
                      const formatedText = maskWhatsapp(text);
                      setFieldValue('whatsapp', formatedText);
                      if (text.length >= 5) {
                        searchCustomers(text);
                      }
                    }}
                    maxLength={15}
                    errorMessage={
                      touched?.whatsapp && errors?.whatsapp && errors.whatsapp
                    }
                  />
                </View>

                {customers.length > 0 && showSearch && (
                  <View style={styles.customersSearchContainer}>
                    {customers.map((c, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          handleOnSelectCustomer(c, setFieldValue)
                        }>
                        {index !== 0 && <View style={styles.divider} />}
                        <View style={styles.customersSearchRow}>
                          <FontAwesome
                            name="user"
                            size={18}
                            color={'#979191'}
                          />
                          <Text style={styles.customersSearchText}>
                            {c.name}
                          </Text>
                        </View>
                        <View style={styles.customersSearchRow}>
                          <FontAwesome
                            name="whatsapp"
                            size={19}
                            color={'#979191'}
                          />
                          <Text style={styles.customersSearchText}>
                            {maskWhatsapp(c.whatsapp)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <View style={{marginBottom: 14}}>
                  <Input
                    type="primary"
                    label={'Nome completo'}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    errorMessage={touched?.name && errors?.name && errors.name}
                  />
                </View>
                <View style={{marginBottom: 14}}>
                  <Input
                    type="primary"
                    label={'E-mail (opcional)'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    errorMessage={
                      touched?.email && errors?.email && errors.email
                    }
                  />
                </View>

                <View style={styles.errorContainer}>
                  <ErrorMessage message={errorMessage} />
                </View>

                <Button
                  text={'Continuar'}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>
        </>
      )}
      {step === 2 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <View style={styles.elipseCheia}></View>
            <View style={styles.line}></View>
            <View style={styles.elipseCheia}></View>
          </View>
          <View
            style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
            <Text style={styles.cliente2}>Cliente</Text>
            <Text style={styles.desejo2}>Desejo</Text>
          </View>
          <Formik
            initialValues={{
              desire: '',
              complements: '',
              original_image: null,
            }}
            onSubmit={onSubmitDesire}
            validationSchema={desireFormSchema}>
            {({
              values,
              errors,
              isSubmitting,
              touched,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <View style={{marginBottom: 14}}>
                  <Input
                    type="primary"
                    label={'Desejo'}
                    value={values.desire}
                    onChangeText={handleChange('desire')}
                    errorMessage={
                      touched?.desire && errors?.desire && errors.desire
                    }
                  />
                </View>
                <View style={{marginBottom: 7}}>
                  <Input
                    type="primary"
                    label={'Complementos'}
                    multiline
                    numberOfLines={5}
                    value={values.complements}
                    onChangeText={handleChange('complements')}
                    errorMessage={
                      touched?.complements &&
                      errors?.complements &&
                      errors.complements
                    }
                  />
                </View>
                <View style={{marginBottom: 17}}>
                  <ProductPicker
                    value={values.original_image}
                    onChange={value => {
                      setFieldValue('original_image', value);
                      setFieldTouched('original_image', true);
                    }}
                    errorMessage={
                      touched?.original_image &&
                      errors?.original_image &&
                      errors.original_image
                    }
                  />
                </View>
                <View style={{marginBottom: 10}}>
                  <Button
                    type="primary"
                    text={'Cadastrar'}
                    onPress={handleSubmit}
                    loading={isSubmitting}
                  />
                </View>
                <View style={{marginBottom: 20}}>
                  <Button
                    type="secondary"
                    text={'Voltar'}
                    onPress={() => setStep(1)}
                  />
                </View>
              </>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  customer: {
    marginBottom: 10,
    marginRight: 10,
    marginTop: 3,
    fontFamily: 'Montserrat',
    color: '#193E5B',
    fontSize: 13,
  },
  desejo: {
    marginBottom: 10,
    marginLeft: 50,
    marginTop: 3,
    color: '#979191',
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  cliente2: {
    marginBottom: 10,
    marginRight: 10,
    fontFamily: 'Montserrat',
    color: '#979191',
    fontSize: 13,
  },
  desejo2: {
    marginBottom: 10,
    marginLeft: 50,
    marginTop: 3,
    fontFamily: 'Montserrat',
    color: '#193E5B',
    fontSize: 13,
  },
  elipseCheia: {
    borderRadius: 20,
    backgroundColor: '#193E5B',
    borderWidth: 2,
    borderColor: '#193E5B',
    width: 22,
    height: 22,
  },
  elipseVazia: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#193E5B',
    width: 22,
    height: 22,
  },
  line: {
    backgroundColor: '#193E5B',
    borderWidth: 2,
    borderColor: '#193E5B',
    width: 70,
    height: 0,
    alignSelf: 'center',
  },
  errorContainer: {
    marginBottom: 14,
  },
  customersSearchContainer: {
    marginTop: -17,
    marginBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 8,
  },
  customersSearchRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  customersSearchText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 8,
    borderTopWidth: 1,
    borderColor: '#c4c4c4',
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setMyDesires})(AddDesejo);
