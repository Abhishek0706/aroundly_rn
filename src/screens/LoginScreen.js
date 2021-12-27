import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {login} from '../store/actions/auth';

import DatePicker from '../components/DatePicker';

const LoginScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login(name, email, dob));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        keyboardType="email-address"
      />
      <DatePicker setDob={setDob} />
      <View style={styles.button}>
        <Button title="submit" onPress={loginHandler} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    marginVertical: 12,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default LoginScreen;
