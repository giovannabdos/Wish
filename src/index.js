import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import initialState from './redux/initialState';
import reducer from './redux/reducer';
import Routes from './routes';
import {StatusBar} from 'react-native';

const store = createStore(reducer, initialState);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={'#193E5B'} />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
