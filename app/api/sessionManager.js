import { AsyncStorage } from 'react-native';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const USER_PROFILE = 'USER_PROFILE';
const DEVICE_TOKEN = 'DEVICE_TOKEN';

export class SessionManager {
  static user = '';
  static access_token = '';

  static setUser = (user) => {
    try {
      SessionManager.user = user;
      AsyncStorage.setItem(USER_PROFILE, JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  static getUser = () => {
    return SessionManager.user;
  }

  static setUserToken(userToken) {
    try {
        SessionManager.access_token = userToken;
        AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(userToken));
      } catch (error) {
        console.log(error);
      }
  }

  static getUserToken() {
    try {
        return SessionManager.access_token;
      } catch (error) {
        console.log(error);
        return '';
      }
  }

  static setDeviceToken(deviceToken) {
    try {
        SessionManager.device_token = deviceToken;
        AsyncStorage.setItem(DEVICE_TOKEN, JSON.stringify(deviceToken));
      } catch (error) {
        console.log(error);
      }
  }

  static getDeviceToken() {
    try {
        return SessionManager.device_token;
      } catch (error) {
        console.log(error);
        return '';
      }
  }

  static async verifyToken() {
    try {
        if(SessionManager.access_token) {
          return SessionManager.access_token;
        }
        const userToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        if(userToken) {
          const user = await AsyncStorage.getItem(USER_PROFILE);
          SessionManager.access_token = JSON.parse(userToken);
          SessionManager.user = JSON.parse(user);
        }

        return SessionManager.access_token;
      } catch (error) {
        console.log(error);
        return '';
      }
  }

  static logout () {
    SessionManager.access_token = '';
    SessionManager.user = '';
    AsyncStorage.removeItem(ACCESS_TOKEN);
    AsyncStorage.removeItem(USER_PROFILE);
  }
}
