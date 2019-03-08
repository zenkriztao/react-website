import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import images from '../../../assets/images/images'
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
    width: dimensions.SCREEN_WIDTH * 0.75,
    height: 50,
    borderRadius: 25,
    paddingVertical: 10,
    // marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_GREY,
    marginBottom: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 20,
    fontFamily: "Roboto-Medium",
  },
  logo: {
    width: 220,
    height: 220,
  },
  gameText: {
    color: 'black',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 30,
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
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      otp: '',
    }
  }

  requestCashout() {
    Alert.alert('Work In Progress');
  }

  render() {
    const { otp } = this.state
    const {userData, loginUserProfile} = this.props
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Balance</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>


        <View style={styles.container}>
        <Image source={images.doller} style={styles.logo} resizeMode="contain" />
          <Text style={styles.gameText}>{userData.currency && userData.currency.symbol} {loginUserProfile.amount && loginUserProfile.amount}</Text>
        </View>
        <View style={[styles.container, {flex: 0.8, alignItems: 'center', justifyContent: 'flex-end'}]}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.requestCashout()}>
            <Text style={styles.buttonText}>Request Cashout</Text>
          </TouchableOpacity>         
           </View>
        {/* <View style={styles.backView}>
          <BackButton action={() => this.props.navigation.goBack()} />
        </View> */}
      </View>
    )
  }
}
