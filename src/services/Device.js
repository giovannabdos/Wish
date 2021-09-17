import {Platform} from 'react-native';
import api from './api';
import Local from './Local';

export default class Device {
  static async register(token) {
    try {
      const device_id = await Local.getDeviceUniqueId();

      const response = await api.post('/device/register/', {
        device_token: token,
        device_id: device_id,
        platform: Platform.OS,
      });

      return response;
    } catch (response) {
      return response;
    }
  }

  static async updateUser(user) {
    try {
      const device_id = await Local.getDeviceUniqueId();

      const response = await api.put('/device/update_user', {
        user_id: user?.id,
        device_id: device_id,
      });

      return response;
    } catch (response) {
      return response;
    }
  }
}
