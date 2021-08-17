import React from 'react';
import {Platform} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const defaultHeader = {
  headerBackImage: () => (
    <SimpleLineIcons
      name="arrow-left"
      size={20}
      style={{marginLeft: Platform.OS === 'ios' ? 14 : 0}}
    />
  ),
  headerBackTitleVisible: false,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'normal',
  },
  headerTitleAlign: 'left',
};
