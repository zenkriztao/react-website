import React, { PureComponent } from 'react'
import { View, Alert, Keyboard, SafeAreaView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import Container from './components/Container'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles';
import ProfileService from '../../api/profile';

export default class HowTOPlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

componentDidMount() {
}

  render() {
    const { isLoading } = this.state

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
      <View style={{ flex: 1 }}>
        <Container
          navigation={this.props.navigation}
        />
        {isLoading && <Loader />}
      </View>
      </SafeAreaView>

    )
  }
}
