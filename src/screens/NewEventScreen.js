import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewEventScreen = ({ data }) => {
  return (
    <View style={styles.screen}>
      <Text>New Event</Text>
      {data && <Text>we have data</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewEventScreen;
