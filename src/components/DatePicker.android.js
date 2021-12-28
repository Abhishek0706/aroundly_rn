import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Text from '../components/UI/Text';

const DatePicker = ({setDob}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate);
    setShow(false);
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.textDob}>{date.toString().substring(0, 15)}</Text>
      <Button title="Choose DOB" onPress={showPicker} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display={'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'blue',
  },
  textDob: {
    marginHorizontal: 10,
  },
});
export default DatePicker;
