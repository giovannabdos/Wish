import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

const DEVICE_ID = '@store:device_id';
const USER = '@wish:user';
const TOKEN = '@wish:token';

export default class Local {
  static async getDeviceUniqueId() {
    const id = await AsyncStorage.getItem(DEVICE_ID);
    if (id === null || id === '') {
      const device_id = uuid.v4();
      await AsyncStorage.setItem(DEVICE_ID, device_id);
      return device_id;
    } else {
      return id;
    }
  }

  static async getUser() {
    return JSON.parse(await AsyncStorage.getItem(USER));
  }

  static async setUser(user) {
    return await AsyncStorage.setItem(USER, JSON.stringify(user));
  }

  static async getToken() {
    return await AsyncStorage.getItem(TOKEN);
  }

  static async setToken(token) {
    return await AsyncStorage.setItem(TOKEN, token);
  }

  static async clear() {
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(TOKEN);
  }
}
