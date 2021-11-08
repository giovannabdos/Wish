import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const ModalSelectable = forwardRef(
  (
    {list = [], initialSelected = null, onChange = () => {}, selectable = true},
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(initialSelected);

    useImperativeHandle(
      ref,
      () => ({
        setVisible: value => setVisible(value),
        getSelectedIndex: selectedIndex,
      }),
      [selectedIndex],
    );

    return (
      <View>
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
                        if (selectable) {
                          setSelectedIndex(index);
                        }
                        onChange(index);
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
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
    color: '#000',
  },
});

export default ModalSelectable;
