import React, {useState, useRef} from 'react';
import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ModalSelectable from './ModalSelectable';

const {width, height} = Dimensions.get('window');

export default function Select({list, label, onChange}) {
  const modalSelectableRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.container}
        onPress={() => modalSelectableRef?.current?.setVisible(true)}>
        <Text style={styles.text}>{list[selectedIndex].name}</Text>
        <SimpleLineIcons
          name="arrow-down"
          size={20}
          color="#000000"
          style={{marginTop: 10, marginBottom: 10, marginRight: 10}}
        />
      </TouchableOpacity>
      <ModalSelectable
        ref={modalSelectableRef}
        list={list}
        onChange={index => {
          setSelectedIndex(index);
          onChange(list[index], index);
        }}
        initialSelected={0}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Montserrat',
    fontSize: 16,
    marginLeft: 14,
  },
  modalContainer: {
    width,
    height,
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: width <= 324 ? width - 24 : 300,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  modalText: {
    marginVertical: 10,
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  label: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    marginLeft: 12,
    marginBottom: 5,
  },
});
