import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({setDob}) => {
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate);
  };

  return (
    <View style={styles.dateContainer}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        display={'spinner'}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    width: 300,
  },
});
export default DatePicker;
