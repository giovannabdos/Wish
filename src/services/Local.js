import AsyncStorage from '@react-native-community/async-storage';

const USER = '@wish:user';
const TOKEN = '@wish:token';

export default class Local {
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
    await AsyncStorage.clear();
  }
}
