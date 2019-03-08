import React, { PureComponent } from 'react'
import { View, Alert, Keyboard, SafeAreaView} from 'react-native'
import { NavigationActions } from 'react-navigation'

import User from '../../store/User'
import Container from './components/Container'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles';

export default class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  componentDidMount() {
    
}
  VerifyOTP(otp) {
    Keyboard.dismiss()
  }

  render() {
    const { isLoading } = this.state
    const { gameId, loogInUserType} = this.props.navigation.state.params

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
          gameId={gameId}
          loogInUserType={loogInUserType}
          VerifyOTP={(otp) => this.VerifyOTP(otp)}
        />
        {isLoading && <Loader />}
      </View>
      </SafeAreaView>
    )
  }
}
