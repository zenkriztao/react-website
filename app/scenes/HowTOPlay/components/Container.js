import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, WebView, Alert, Platform } from 'react-native'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import BackButton from '../../../components/BackButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_WHITE,
  },
  backView: {
    width: dimensions.SCREEN_WIDTH,
    height: 64,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    top: 5,
    left: 0
  },
  headerText: {
    color: 'black',
    fontSize: 22,
    fontFamily: "Roboto-Medium",
    fontWeight: '900',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: dimensions.SCREEN_WIDTH * 0.50,
    height: 40,
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_GREY,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 20,
    fontFamily: "Roboto-Medium",
  },
  logo: {
    width: 150,
    height: 150,
  },
  gameText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 20,
    fontFamily: "Roboto-Medium",
  },

  navBar: {
    width: dimensions.SCREEN_WIDTH,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: "Roboto-Medium",
    textAlign: 'center',
    color: 'black',
  },
  backView: {
    marginHorizontal: 10,
  },
  webviewStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  requestCashout() {
    Alert.alert('Work In Progress');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>How To Play</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>
        <WebView
        source={{uri: 'https://www.sktrivia.com'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />
      </View>
    )
  }
}
