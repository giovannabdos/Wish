import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalSelectable from './ModalSelectable';

const SelectPhoto = forwardRef(({onChange}, ref) => {
  const modalSelectableRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      setVisible: value => modalSelectableRef?.current?.setVisible(value),
    }),
    [modalSelectableRef?.current],
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const getImageName = uri => {
    const nameArray = uri.split('/');
    const nameImage = nameArray[nameArray.length - 1];
    return nameImage;
  };

  const handleLaunchCamera = () => {
    if (!requestCameraPermission()) return false;

    const options = {
      mediaType: 'photo',
    };

    launchCamera(options, async responseImage => {
      const file = responseImage.assets?.[0];
      if (file) {
        // ajusteContainerImagem(responseImage);
        const imageName = file.fileName;
        if (!imageName) {
          imageName = getImageName(file.uri);
        }
        const image = {
          uri: file.uri,
          name: imageName,
          type: file.type,
        };
        onChange(image);
      }
    });
  };

  const handleLaunchImageLibrary = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async responseImage => {
      const file = responseImage.assets?.[0];
      if (file) {
        // ajusteContainerImagem(responseImage);
        const imageName = file.fileName;
        if (!imageName) {
          imageName = getImageName(file.uri);
        }
        const image = {
          uri: file.uri,
          name: imageName,
          type: file.type,
        };
        onChange(image);
      }
    });
  };

  return (
    <ModalSelectable
      ref={modalSelectableRef}
      list={[{name: 'Câmera'}, {name: 'Galeria'}]}
      onChange={index => {
        if (index === 0) {
          handleLaunchCamera();
        } else {
          handleLaunchImageLibrary();
        }
      }}
      selectable={false}
    />
  );
});

export default SelectPhoto;
