/* eslint no-undef: 0 */
import {
  Platform,
} from 'react-native';

const ImagePicker = require('react-native-image-picker');

const mediaOptions = {
  title: 'Select image options',
  mediaType: 'photos',
  quality: 0.5,
};

const getImageObject = (response, filename) => {
  let photo;
  if (Platform.OS === 'ios') {
    photo = {
      uri: response.uri,
      type: `image/${response.uri.slice(response.uri.indexOf('.') + 1, response.uri.length).toLowerCase()}`,
      name: `${filename}.${response.uri.slice(response.uri.indexOf('.') + 1, response.uri.length)}`,
    };
  } else {
    photo = {
      uri: response.uri,
      type: `image/${response.fileName.slice(response.fileName.indexOf('.') + 1, response.fileName.length).toLowerCase()}`,
      name: `${filename}.${response.fileName.slice(response.fileName.indexOf('.') + 1, response.fileName.length)}`,
    };
  }
  return photo;
};

export const getMultipartData = (key, value) => {
  const multipartBody = new FormData();
  multipartBody.append(key, value);
  return multipartBody;
};

const callImageData = (setAvaterSource, key, response) => {
  if (response.didCancel) {
    console.log('Image cancelled');
  } else if (response.error) {
    console.log('Error');
  } else {
    const filename = `IMG_${new Date().getTime()}`;
    const photo = getImageObject(response, filename);
    if (key && key !== null && key.length > 0) {
      const multipartBody = getMultipartData(key, photo);
      setAvaterSource(response.uri, multipartBody);
    } else {
      setAvaterSource(response.uri, photo);
    }
  }
};

export const imagePicker = (setAvaterSource, key) => {
  ImagePicker.showImagePicker(mediaOptions, (response) => {
    callImageData(setAvaterSource, key, response);
  });
};

export const cameraPicker = (setAvaterSource, key) => {
  ImagePicker.launchCamera(mediaOptions, (response) => {
    callImageData(setAvaterSource, key, response);
  });
};

export const galleryPicker = (setAvaterSource, key) => {
  ImagePicker.launchImageLibrary(mediaOptions, (response) => {
    callImageData(setAvaterSource, key, response);
  });
};
