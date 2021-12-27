import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {useDispatch} from 'react-redux';
import {login} from '../store/actions/auth';

import DatePicker from '../components/DatePicker';

const LoginScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login(name, email, dob, image));
  };

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaTypes: 'photo',
      quality: 1,
    });
    if (!result.didCancel) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      )}
      <View style={styles.button}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
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
