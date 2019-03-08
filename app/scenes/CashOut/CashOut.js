import React, { PureComponent } from 'react'
import { View, Alert, Keyboard, SafeAreaView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import Container from './components/Container'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles';
import ProfileService from '../../api/profile';

export default class CashOut extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loginUserProfile: {},
    }
  }

componentDidMount() {
    this.getLoginUserProfile()
}

getLoginUserProfile() {
  this.setState({ isLoading: true}, () => {
    ProfileService.getUserProfile(User.userId).then((response) => {
      console.log('======>>>>> USERPROFILE', response)
      if (response.data &&
        response.data.status === 'success' &&
        response.data.data) {
        this.setState({ loginUserProfile: response.data.data })
        return
      }

      if (response.data && response.data.status === 'error' && response.data.message) {
        Alert.alert('Message', response.data.message)
        return
      }
   
    }).catch((error) => {
      console.log('!!!!!!!!! ', error)
    }).finally(() => this.setState({ isLoading: false }))
  })
}

VerifyOTP(otp) {
  Keyboard.dismiss()
}
  render() {
    const { isLoading, loginUserProfile } = this.state
    const { userData } = this.props.navigation.state.params
    console.log('!!!!!!!!! _______----', userData)

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
          VerifyOTP={(otp) => this.VerifyOTP(otp)}
          userData={userData}
          loginUserProfile={loginUserProfile}
        />
        {isLoading && <Loader />}
      </View>
      </SafeAreaView>

    )
  }
}
