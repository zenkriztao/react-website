import React, { PureComponent } from 'react'
import { View, StyleSheet, Animated, Text, TouchableOpacity, ImageBackground, Alert, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import AuthService from '../../api/auth'
import images from '../../assets/images/images'
import dimensions from '../../utils/dimensions'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(225,225,225)',
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: dimensions.SCREEN_WIDTH * 0.35,
    height: dimensions.SCREEN_WIDTH * 0.35,
  },
  notifText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.APP_RED,
    marginHorizontal: 22,
    marginTop: 40,
    fontFamily: "Roboto-Medium",

  },
  button: {
    width: dimensions.SCREEN_WIDTH * 0.72,
    borderRadius: 25,
    paddingVertical: 13,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_RED,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: "Roboto-Medium",

  },
})

export default class NotificationVerification extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      leftRightAnimation: new Animated.Value(0),
      isLoading: false
    }
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation() {
    Animated.sequence([
      Animated.timing(this.state.leftRightAnimation, { toValue: -7, duration: 120 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 7, duration: 120 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: -6, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 6, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: -5, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 5, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: -3, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 3, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: -2, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 2, duration: 100 }),
      Animated.timing(this.state.leftRightAnimation, { toValue: 0, duration: 100 }),
    ]).start(() => this.startAnimation())
  }

  onNotificationConfirm() {
    const { userId } = this.props.navigation.state.params

    this.setState({ isLoading: true }, () => {
      // To Do: Update token in params
      AuthService.updateUserNotificationToken(
        userId,
        Platform.OS === "android" ? 'A': 'i',
        User.getToken(),
        )
        .then((response) => {
          if (response.data && response.data.status === 'success') {
          }
          this.goToHome()
        })
        .catch((error) => {
  
        }).finally(() => this.setState({ isLoading: false }))
    })
  }

  onSkip() {
    this.goToHome()
  }

  goToHome() {
    const { userId } = this.props.navigation.state.params

    // Store User
    User.storeUser({ userId })
    
    setTimeout(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Home',
            params: { userId }
          }),
        ],
        key: null,
      })
      this.props.navigation.dispatch(resetAction)
    }, 200)
  }

  render() {
    const { leftRightAnimation, isLoading } = this.state
    return (
      <View style={styles.container}>
        <ImageBackground source={images.notification_bg} style={styles.bgImage} resizeMode="cover">
          <Animated.Image source={images.bell} style={[styles.bellIcon,{ transform: [{ translateX: leftRightAnimation }] }]}/>

          <Text style={styles.notifText}>Stay connected with push notifications to recieve alerts when game is about to start, winnings, referral signups and more</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.onNotificationConfirm()}
          >
            <Text style={styles.buttonText}>Yeah</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor: 'transparent' }]}
            onPress={() => this.onSkip()}
          >
            <Text style={[styles.buttonText, { color: 'rgb(160,160,160)', fontSize: 18 }]}>skip</Text>
          </TouchableOpacity>
        </ImageBackground>
        {isLoading && <Loader />}
      </View>
    )
  }
}
