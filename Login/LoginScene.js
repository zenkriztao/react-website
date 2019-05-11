import React, { PureComponent } from 'react'
import { View, Alert, Keyboard, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import AuthService from '../../api/auth';
import Container from './components/Container'
import Loader from '../../components/Loader'
import { timeZoneName } from '../../utils/utils';

export default class LoginScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }



  componentWillMount() {
   
  }



  performLogin(phone, countryCode) {
    Keyboard.dismiss()
    // TO DO Api Untuk Verifikasi Telpon

    this.setState({ isLoading: true}, () => {
      AuthService.signIn(phone, countryCode, Platform.OS === 'android' ? 'A' : 'i', timeZoneName).then((response) => {
        console.log('======>>>>> ', response)
        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('PESAN', response.data.message)
          return
        }
        if (response.data && response.data.status === 'success') {
          Alert.alert('PESAN', response.data.message)
          this.props.navigation.navigate('VerifyOTP', { userId: response.data.userId, phone, countryCode })
        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
    // this.props.navigation.navigate('VerifyOTP')
  }

  render() {
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
          performLogin={(phone, countryCode) => this.performLogin(phone, countryCode)}
        />
        {isLoading && <Loader />}
      </View>
    )
  }
}
