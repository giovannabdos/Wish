import {Platform} from 'react-native';
var config = require('../../config.json');

export default function host() {
  let hostString = config['dev-host'];

  switch (config['environment']) {
    case 'test':
      hostString = config['test-host'];
      break;

    case 'staging':
      hostString = config['staging-host'];
      break;

    case 'production':
      hostString = config['prod-host'];
      break;

    default:
      hostString = config['dev-host'];
      break;
  }

  if (Platform.OS === 'android') {
    hostString = hostString.replace('localhost', '10.0.2.2');
  }

  return hostString;
}
