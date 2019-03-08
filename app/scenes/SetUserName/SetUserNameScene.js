import React, { PureComponent } from 'react'
import { View, Alert, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AuthService from '../../api/auth'
import User from '../../store/User'
import Container from './components/Container'
import Loader from '../../components/Loader'

export default class SetUserNameScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  updateUserName = (userName, referralHandle) => {
    const { userId } = this.props.navigation.state.params
    this.setState({ isLoading: true }, () => {
      AuthService.updateUserName(userId, userName, referralHandle).then((response) => {
        if (response.data && response.data.message) {
          Alert.alert('Message', response.data.message)
        }
        if (response.data && response.data.status === 'success') {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'NotificationVerification',
                params: { userId }
              }),
            ],
            key: null,
          })
          this.props.navigation.dispatch(resetAction)
        }
      }).catch((error) => {
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
          updateUserName={this.updateUserName}
        />
        {isLoading && <Loader />}
      </View>
    )
  }
}
