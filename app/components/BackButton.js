import React from  'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import images from '../assets/images/images'
import { COLORS } from '../utils/styles';

const styles = StyleSheet.create({
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: 45,
    height: 45,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: 30,
    height: 30,
  },
})

const BackButton = props => (
  <View style={styles.cover}>
    <TouchableOpacity style={styles.backButton} onPress={() => props.action()}>
      <Image style={styles.backImage} source={images.back_white} resizeMode="contain" />
    </TouchableOpacity>
  </View>
)

BackButton.defaultProps = {
  action: () => null,
}

export default BackButton
