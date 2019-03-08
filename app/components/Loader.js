import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { COLORS } from '../utils/styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#00000060',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    position: 'absolute',
  },
  loaderbackgroundView: {
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 25,
  },
  loaderContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  redView: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    backgroundColor: COLORS.APP_RED,
  },
  blueView: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    backgroundColor: COLORS.APP_BACKGROUND,
  },
});

const rotateAnimation = new Animated.Value(0);

const startAnimation = () => {
  Animated.timing(
    rotateAnimation,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    },
  ).start(() => {
    rotateAnimation.setValue(0);
    startAnimation();
  });
};

const Loader = () => {
  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
      <View style={styles.loaderbackgroundView}>
        <Animated.View style={[styles.loaderContainer, { transform: [{ rotate: spin }] }]}>
          <View style={styles.redView} />
          <View style={styles.blueView} />
        </Animated.View>
      </View>
    </View>
  );
};
startAnimation();

Loader.propTypes = {
};

Loader.defaultProps = {
};

export default Loader;
