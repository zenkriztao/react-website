import React, { PureComponent } from 'react'
import { View, Alert, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import Container from './components/Container'
import Loader from '../../components/Loader'
import AuthService from '../../api/auth'

export default class VerifyOTPScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  verifyOTP(otp) {
    Keyboard.dismiss()
    const { userId } = this.props.navigation.state.params
    this.setState({ isLoading: true }, () => {
      AuthService.verifyCode(userId, otp).then((response) => {
        console.log('======>>>>> ', response)
        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
          return
        }
        if (response.data && response.data.status === 'success') {
          Alert.alert('Message', response.data.message)
          if (response.data.handle) {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'NotificationVerification',
                  params: { userId: response.data.userId }
                }),
              ],
              key: null,
            })
            this.props.navigation.dispatch(resetAction)
            return
          }
          this.props.navigation.navigate('SetUserName', { userId: response.data.userId })
        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
          verifyOTP={(otp) => this.verifyOTP(otp)}
        />
        {isLoading && <Loader />}
      </View>
    )
  }
}
