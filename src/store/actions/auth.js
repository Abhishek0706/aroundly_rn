import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const DIDTRYAUTOLOGIN = 'didTryAutoLogin';

export const login = (name, email, dob) => {
  saveDataToStorage(name, email, dob);
  return {type: LOGIN, payload: {name: name, email: email, dob: dob}};
};

export const logout = () => {
  deleteDatafromStorage();
  return {type: LOGOUT};
};

export const didTryAutoLogin = () => {
  return {type: DIDTRYAUTOLOGIN};
};

const saveDataToStorage = async (name, email, dob) => {
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      name,
      email,
      dob,
    }),
  );
};

const deleteDatafromStorage = async () => {
  await AsyncStorage.removeItem('userData');
};
