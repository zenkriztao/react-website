import React, { Component } from 'react'
import { View, NetInfo, Text, StyleSheet } from 'react-native'
import RootNavigator from './navigator/AppNavigator'
import User from './store/User'
import NoficationManager from './notificationManager/NoficationManager'

const styles = StyleSheet.create({
  noInternetView: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  noInternetText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    color: '#333333',
  },
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInternetConnected: true,
    }
    NoficationManager.getDeviceTokenForFirebase()
    User.getUserFromStore()
  }

  componentWillMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this),
    )
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this),
    )
  }

  handleFirstConnectivityChange(reach) {
    if (reach.type === 'none' || reach.type === 'NONE') {
      this.setState({ isInternetConnected: false })
    } else {
      this.setState({ isInternetConnected: true })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator />
        {!this.state.isInternetConnected && <View style={styles.noInternetView}>
          <Text style={styles.noInternetText}>{'No Internet Connection.\nPlease check your internet connection.'}</Text>
        </View>}
      </View>
    )
  }
}


