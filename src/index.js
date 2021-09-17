import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import initialState from './redux/initialState';
import reducer from './redux/reducer';
import Routes from './routes';
import {StatusBar} from 'react-native';
import NotificationHandlerComponent from './components/NotificationHandlerComponent';

const store = createStore(reducer, initialState);

export default class App extends NotificationHandlerComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar backgroundColor={'#193E5B'} />
          <Routes />
        </NavigationContainer>
      </Provider>
    );
  }
}
