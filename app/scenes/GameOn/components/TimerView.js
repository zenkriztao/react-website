import React from 'react'
import { View, Text, StyleSheet, Animated, Image } from 'react-native'
import images from '../../../assets/images/images'
import { GameStateTypes } from '../../../utils/constants'
import { COLORS, defaultStyle } from '../../../utils/styles'

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: COLORS.APP_RED,
    ...defaultStyle,
  },
  timerText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
  },

  timesUpView: {
    backgroundColor: COLORS.APP_BACKGROUND,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 15,
  },
  timesUpText: {
    color: COLORS.APP_WHITE,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },

  explanationView: {
    width: 80,
    height: 80,
    ...defaultStyle,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.APP_RED,

  },
  logoImage: {
    width: 60,
    height: 60,
    tintColor: COLORS.APP_RED,
  },
})

const borderAnimation = new Animated.Value(0)

const startAnimation = () => {
  Animated.timing(
    borderAnimation,
    {
      toValue: 1,
      duration: 1000,
    },
  ).start(() => {
    borderAnimation.setValue(0)
    startAnimation()
  })
}

const TimerView = (props) => {
  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', COLORS.APP_RED],
  })

  switch (props.currentGameState) {
    case GameStateTypes.LIVE_QUESTION:
      return (
        <Animated.View style={[styles.container, { borderColor }]}>
          <Text style={styles.timerText}>{props.timeRemaining}</Text>
        </Animated.View>)
      break
    case GameStateTypes.TIMES_UP:
      return (
        <View style={styles.timesUpView}>
          <Text style={styles.timesUpText}>Time's Up!</Text>
        </View>
      )
      break
    case GameStateTypes.ELIMINATE://eliminated
      return (
        <View style={[styles.timesUpView, {backgroundColor: 'red'}]}>
          <Text style={styles.timesUpText}>Eliminated</Text>
        </View>
      )
      break
    case GameStateTypes.EXPLANATION:
      return (
        <View style={styles.explanationView}>
          <Image source={images.logo} style={styles.logoImage} resizeMode="contain" />
        </View>
      )
      break
    default:
      return null
      break
  }
}

TimerView.defaultProps = {
  timesUp: false,
  timeRemaining: 15,
  currentGameState: GameStateTypes.TIMES_UP,
}

startAnimation()

export default TimerView
