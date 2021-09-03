import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {width, height} = Dimensions.get('window');

export default function Select({list}) {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(true)}>
        <Text style={styles.text}>{list[selectedIndex].name}</Text>
        <SimpleLineIcons
          name="arrow-down"
          size={20}
          color="#000000"
          style={{marginTop: 10, marginBottom: 10, marginRight: 10}}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              {list &&
                list.map((value, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      setSelectedIndex(index);
                      setVisible(false);
                    }}>
                    <Text
                      style={[
                        styles.modalText,
                        {
                          color: index === selectedIndex ? '#193E5B' : '#000',
                          fontFamily:
                            index === selectedIndex
                              ? 'Montserrat-SemiBold'
                              : 'Montserrat',
                        },
                      ]}>
                      {value.name}
                    </Text>
                  </TouchableWithoutFeedback>
                ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
});
