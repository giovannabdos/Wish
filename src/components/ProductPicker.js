import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import ErrorMessage from '../components/ErrorMessage';

// const {width, height} = Dimensions.get('window');

// const HORIZONTAL_SPACING = 20;

export default function ProductPicker({value, onChange, errorMessage, text}) {
  const [image, setImage] = useState(value || null);
  const [imageHeight, setImageHeight] = useState(0);

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

  // const ajusteContainerImagem = image => {
  //   if (image && image.uri) {
  //     let imageName = image.fileName;
  //     if (!imageName) {
  //       imageName = getImageName(image.uri);
  //     }
  //     if (image.width && image.height) {
  //       const ratio = Math.min(
  //         width - HORIZONTAL_SPACING / image.width,
  //         height / image.height,
  //       );
  //       setImageHeight(image.height * ratio);
  //       setImage({
  //         uri: image.uri,
  //         name: imageName,
  //         type: image.type,
  //       });
  //     } else {
  //       Image.getSize(
  //         image.uri,
  //         (widthImage, heightImage) => {
  //           const ratio = Math.min(
  //             width - HORIZONTAL_SPACING / widthImage,
  //             height / heightImage,
  //           );
  //           setImageHeight(heightImage * ratio);
  //           setImage({
  //             uri: image.uri,
  //             name: imageName,
  //             type: image.type,
  //           });
  //         },
  //         err => {
  //           console.log(err);
  //         },
  //       );
  //     }
  //   }
  // };

  const handleImagePicker = () => {
    if (!requestCameraPermission()) return false;

    const options = {
      title: 'Selecionar imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Câmera',
      chooseFromLibraryButtonTitle: 'Galeria',
      rotation: 360,
    };

    ImagePicker.showImagePicker(options, async responseImage => {
      if (responseImage.uri) {
        // ajusteContainerImagem(responseImage);
        const imageName = responseImage.fileName;
        if (!imageName) {
          imageName = getImageName(responseImage.uri);
        }
        const image = {
          uri: responseImage.uri,
          name: imageName,
          type: responseImage.type,
        };
        setImage(image);
        onChange(image);
      }
    });
  };

  return (
    <TouchableOpacity onPress={() => handleImagePicker()}>
      {!!image ? (
        <View style={styles.containerImage}>
          <Image
            resizeMode="cover"
            resizeMethod="auto"
            progressiveRenderingEnabled={true}
            source={{uri: image.uri}}
            style={{
              // width: width - HORIZONTAL_SPACING,
              // height: imageHeight,
              width: '100%',
              height: 300,
              borderRadius: 10,
            }}
          />
        </View>
      ) : (
        <View
          style={[
            styles.containerPicker,
            {borderColor: !!errorMessage ? '#dd2c00' : '#BABABA'},
          ]}>
          <MaterialCommunityIcons
            name="camera-plus"
            size={70}
            style={{marginLeft: 14}}
            color={'#BABABA'}
            style={styles.camera}
          />
          <Text style={styles.text}>
            {text ? text : 'Tire uma foto do produto \n ou da etiqueta'}
          </Text>
        </View>
      )}
      {!!errorMessage && (
        <View style={styles.errorMessageContainer}>
          <ErrorMessage message={errorMessage} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    marginTop: 10,
  },
  containerPicker: {
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: 10,
    justifyContent: 'center',
  },
  camera: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Montserrat',
    color: '#BABABA',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorMessageContainer: {
    marginTop: 3,
  },
});
