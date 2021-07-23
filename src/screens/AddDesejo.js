import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import ProductPicker from '../components/ProductPicker';

export default function AddDesejo() {
  const [step, setStep] = useState('Cliente');

  return (
    <Container>
      {step === 'Cliente' && (
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
            <Text style={styles.cliente}>Cliente</Text>
            <Text style={styles.desejo}>Desejo</Text>
          </View>
          <View style={{marginBottom: 14}}>
            <Input type="primary" label={'Watsapp'} />
          </View>
          <View style={{marginBottom: 14}}>
            <Input type="primary" label={'Nome completo'} />
          </View>
          <View style={{marginBottom: 14}}>
            <Input type="primary" label={'E-mail (opcional)'} />
          </View>
          <Button text={'Continuar'} onPress={() => setStep('Desejo')} />
        </>
      )}
      {step === 'Desejo' && (
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
          <View style={{marginBottom: 14}}>
            <Input type="primary" label={'Desejo'} />
          </View>
          <View style={{marginBottom: 14}}>
            <Input
              type="primary"
              label={'Complemento'}
              multiline
              numberOfLines={5}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <ProductPicker />
          </View>
          <View style={{marginBottom: 10}}>
            <Button type="primary" text={'cadastrar'} />
          </View>
          <View style={{marginBottom: 53}}>
            <Button
              type="secondary"
              text={'Voltar'}
              onPress={() => setStep('Cliente')}
            />
          </View>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  cliente: {
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
    width: 30,
    height: 30,
  },
  elipseVazia: {
    borderRadius: 20,
    backgroundColor: '#193E5B',
    borderWidth: 2,
    borderColor: '#193E5B',
    width: 30,
    height: 30,
  },
  line: {
    backgroundColor: '#193E5B',
    borderWidth: 2,
    borderColor: '#193E5B',
    width: 70,
    height: 0,
    alignSelf: 'center',
  },
});
