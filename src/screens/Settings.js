import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Container from '../components/Container';
import {clearAll} from '../redux/actions';
import Button from '../components/Button';
import Local from '../services/Local';

function Settings({clearAll}) {
  const logout = async () => {
    await Local.clear();
    clearAll();
  };

  return (
    <Container>
      <Button type="secondary" text={'Sair'} onPress={() => logout()} />
    </Container>
  );
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {clearAll})(Settings);
