import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const LogoutButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});

export default LogoutButton;
