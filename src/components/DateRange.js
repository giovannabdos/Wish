import React, {useState, useMemo, useImperativeHandle, forwardRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import startOfMonth from 'date-fns/startOfMonth';
import startOfToday from 'date-fns/startOfToday';
import format from 'date-fns/format';

const FORMAT_DATE_TO_API = 'yyyy/MM/dd';
const FORMAT_DATE_TO_VIEW = 'dd MMM yyyy';

const DateRange = forwardRef(({onChange}, ref) => {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(startOfToday(new Date()));
  const [datePickerType, setDatePickerType] = useState('start');
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      initialRange: formatToApi(startDate, endDate),
    }),
    [startDate, endDate],
  );

  const openDatePicker = type => {
    if (datePickerType !== type) {
      setDatePickerType(type);
    }
    setIsDateTimePickerVisible(true);
  };

  const onConfirmDatePicker = value => {
    if (datePickerType === 'start') {
      setStartDate(value);
      onChange(formatToApi(value, endDate));
    } else {
      setEndDate(value);
      onChange(formatToApi(startDate, value));
    }
    setIsDateTimePickerVisible(false);
  };

  const formatToApi = (start, end) => {
    return {
      start_date: format(start, FORMAT_DATE_TO_API),
      end_date: format(end, FORMAT_DATE_TO_API),
    };
  };

  const formatedStartDate = useMemo(() => {
    return format(startDate, FORMAT_DATE_TO_VIEW);
  }, [startDate]);

  const formatedEndDate = useMemo(() => {
    return format(endDate, FORMAT_DATE_TO_VIEW);
  }, [endDate]);

  const initialDatePicker = useMemo(() => {
    return datePickerType === 'start' ? startDate : endDate;
  }, [datePickerType, startDate, endDate]);

  const minimumDate = useMemo(() => {
    return datePickerType === 'end' ? startDate : undefined;
  }, [datePickerType, startDate]);

  const maximumDate = useMemo(() => {
    return datePickerType === 'start' ? endDate : undefined;
  }, [datePickerType, endDate]);

  const renderCalendar = () => (
    <FontAwesome5 name="calendar" size={15} color="#000000" />
  );

  const renderArrowDown = () => (
    <SimpleLineIcons name="arrow-down" size={16} color="#000000" />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => openDatePicker('start')}>
        {renderCalendar()}
        <Text style={styles.datePickerText}>{formatedStartDate}</Text>
        {renderArrowDown()}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => openDatePicker('end')}>
        {renderCalendar()}
        <Text style={styles.datePickerText}>{formatedEndDate}</Text>
        {renderArrowDown()}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        onConfirm={value => onConfirmDatePicker(value)}
        onCancel={() => setIsDateTimePickerVisible(false)}
        date={initialDatePicker}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        mode="date"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
  },
  datePickerText: {
    fontFamily: 'Montserrat',
    paddingHorizontal: 7,
  },
});

export default DateRange;
