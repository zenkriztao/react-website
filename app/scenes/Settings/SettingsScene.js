import React, { PureComponent } from 'react'
import { SafeAreaView, Alert } from 'react-native'
import Container from './components/Container'
import Loader from '../../components/Loader'
import ProfileService from '../../api/profile';
import { COLORS } from '../../utils/styles'
import User from '../../store/User'
import AuthService from '../../api/auth'

export default class SettingsScene extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      loginUserProfile: {},
      isShowreferralHandle: false,
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
          this.setState({ loginUserProfile: response.data.data,
            isShowreferralHandle: response.data.data.referralHandle !== '' ? true : false
          })
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

  updateUserName = (handle, referralHandle) => {

    this.setState({ isLoading: true }, () => {
      AuthService.updateUserName(User.userId, '', referralHandle).then((response) => {
        if (response.data &&
          response.data.status === 'success' &&
          response.data) {
          // this.setState({ loginUserProfile: response.data.data })
          Alert.alert('Message', response.data.message)

          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
          return
        }
      }).catch((error) => {
        Alert.alert('Message')

      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  updateProfile = (handle, referralHandle, updateProfile) => {

    this.setState({ isLoading: true }, () => {
      AuthService.updateProfile(User.userId, '', '', updateProfile).then((response) => {
        if (response.data &&
          response.data.status === 'success' &&
          response.data) {
          // this.setState({ loginUserProfile: response.data.data })
          Alert.alert('Message', response.data.message)

          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
          return
        }
      }).catch((error) => {
        Alert.alert('Message')

      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  
  render() {
    const { isLoading } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
        <Container
          navigation={this.props.navigation}
          loginUserProfile={this.state.loginUserProfile}
          updateUserName={this.updateUserName}
          updateProfile={this.updateProfile}
          isShowreferralHandle={this.state.isShowreferralHandle}
          isLoading={isLoading}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    )
  }
}
