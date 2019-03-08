import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Linking, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import DeviceInfo from 'react-native-device-info';

import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import BackButton from '../../../components/BackButton';
import User from '../../../store/User'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 50,
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
    fontWeight: '900',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Roboto-Medium",
  },
  button: {
    // width: dimensions.SCREEN_WIDTH * 0.50,
    // height: 40,
    // borderRadius: 25,
    // paddingVertical: 10,
    // marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.APP_GREY,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 20,
    fontFamily: "Roboto-Medium",
  },
  logo: {
    width: 45,
    height: 45,
  },
  socialLogo: {
    width: 70,
    height: 70,
  },
  gameText: {
    color: 'black',
    fontSize: 26,
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
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      otp: '',
    }
  }

  chackForLogin() {
    Alert.alert('You need to login', '', [{
      text: 'cancel',
    },
    {
      text: 'login',
      onPress: () => this.login(),
      style: 'destructive'
    }
  ])
  }

  login() {
    User.deleteUser()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
      key: null,
    })
    this.props.navigation.dispatch(resetAction)
  }

  socailAction() {
    // this.props.navigation.navigate('HowTOPlay')
    Linking.openURL('https://www.sktrivia.com')

    
  }
  twitterSocailAction() {
    // this.props.navigation.navigate('HowTOPlay')
    Linking.openURL('https://twitter.com/SkTrivia')
    
  }
  facebookSocailAction() {
    // this.props.navigation.navigate('HowTOPlay')
    Linking.openURL('https://www.facebook.com/sktrivia')
    
  }
  howToPlayAction() {
    // this.props.navigation.navigate('HowTOPlay')
    Linking.openURL('https://www.sktrivia.com')
  }
  termAction() {
    // this.props.navigation.navigate('HowTOPlay')
    Linking.openURL('https://www.sktrivia.com')
  }
  submitAction() {
    if (this.props.loogInUserType === 'guest') {
      this.chackForLogin()
    } else {
      this.props.navigation.navigate('SumbitTrivia', {gameId: this.props.gameId})
    }
  }

  rulesAction() {
    Linking.openURL('https://www.sktrivia.com/rules.html')
  }
  privacyAction() {
    Linking.openURL('https://www.sktrivia.com/privacy-policy.html')
  }
  termAction() {
    Linking.openURL('https://www.sktrivia.com/terms.html')
  }

  render() {
    const { otp } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>About</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>

        <View style={[styles.container, {flex: 0.6}]}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity activeOpacity={0.7}  onPress={() => this.howToPlayAction()}>
        <Image source={images.play} style={[styles.logo]} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}  onPress={() => this.howToPlayAction()}>
          <Text style={[styles.gameText, {marginTop: 0, marginLeft: 20}]}>How to play</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity activeOpacity={0.7}  onPress={() => this.submitAction()}>
        <Image source={images.submitTR} style={[styles.logo]} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}  onPress={() => this.submitAction()}>
          <Text style={[styles.gameText, {marginTop: 0, marginLeft: 20}]}>Submit trivia</Text>
          </TouchableOpacity>
          </View>
        </View>
        {/* <View style={[styles.container, {flex: 0.4, flexDirection: 'row'}]}>
       
        </View> */}
        <View style={[styles.container, {flex: 0.4, flexDirection: 'row', marginTop: 50}]}>
        <TouchableOpacity activeOpacity={0.7}  onPress={() => this.howToPlayAction()}>
        <Image source={images.rateus} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}  onPress={() => this.howToPlayAction()}>
          <Text style={[styles.gameText, {marginTop: 8, marginLeft: 20}]}>Rate us</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.container, {flex: 0.7, justifyContent: 'space-around', flexDirection: 'row',}]}>           
           <TouchableOpacity activeOpacity={0.7} style={[styles.button]} onPress={() => this.twitterSocailAction()}>
          <Image source={images.twitter} style={styles.socialLogo} resizeMode="contain" />
          <TouchableOpacity activeOpacity={0.7} style={[styles.button, {marginTop: 15}]} onPress={() => this.termAction()}>

          <Text style={[styles.gameText, {marginTop: 8, color: 'rgb(139,129,173)', fontSize: 20},]}>Terms</Text>
          </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.socailAction()}>

          <Image source={images.instagram} style={styles.socialLogo} resizeMode="contain" />
          <TouchableOpacity activeOpacity={0.7} style={[styles.button, {marginTop: 15}]} onPress={() => this.privacyAction()}>

          <Text style={[styles.gameText, {marginTop: 8, color: 'rgb(139,129,173)', fontSize: 20},]}>|    Privacy    |</Text>
          </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[styles.button]} onPress={() => this.facebookSocailAction()}>

          <Image source={images.facebook} style={styles.socialLogo} resizeMode="contain" />
          <TouchableOpacity activeOpacity={0.7} style={[styles.button, {marginTop: 15}]} onPress={() => this.rulesAction()}>

          <Text style={[styles.gameText, {marginTop: 8, color: 'rgb(139,129,173)', fontSize: 20},]}>Rules</Text>
          </TouchableOpacity>
          </TouchableOpacity>
           </View>
           <View style={{width: dimensions.SCREEN_WIDTH, height: 100, alignItems: 'center'}}>
            <Text style={[styles.gameText, {marginTop: 0, color: 'rgb(139,129,173)', fontSize: 18},]}>{DeviceInfo.getVersion()} b{DeviceInfo.getBuildNumber()} </Text>
            <Text style={[styles.gameText, {marginTop: 30, color: '#2F4F4F', fontSize: 9},]}>Made in India with ♥ from Kairos Team,Vizag,Andhra Pradesh</Text>
            <Text style={[styles.gameText, {marginTop: 15, color: '#2F4F4F', fontSize: 11},]}>© 2018 Skil Inc. All rights reserved </Text>
           </View>
      </View>
    )
  }
}
