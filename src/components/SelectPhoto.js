import React, {useState, useRef, useImperativeHandle, forwardRef} from 'react';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ModalSelectable from './ModalSelectable';

const SelectPhoto = forwardRef(({resizeOptions = {}, onChange}, ref) => {
  const [imageResizeOptions] = useState({
    width: 600,
    height: 600,
    quality: 100,
    ...resizeOptions,
  });

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

  const resizeFile = async file => {
    let newFile = file;
    await ImageResizer.createResizedImage(
      file.uri,
      imageResizeOptions.width,
      imageResizeOptions.height,
      'JPEG',
      imageResizeOptions.quality,
    ).then(resizedFile => {
      newFile = resizedFile;
    });
    return newFile;
  };

  const handleLaunchCamera = () => {
    if (!requestCameraPermission()) return false;

    const options = {
      mediaType: 'photo',
    };

    launchCamera(options, async responseImage => {
      const file = responseImage.assets?.[0];
      if (file) {
        const resizedfile = await resizeFile(file);
        const imageName = file?.fileName;
        if (!imageName) {
          imageName = getImageName(file.uri);
        }
        const image = {
          uri: resizedfile.uri,
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
        const resizedfile = await resizeFile(file);
        const imageName = file?.fileName;
        if (!imageName) {
          imageName = getImageName(file.uri);
        }
        const image = {
          uri: resizedfile.uri,
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
