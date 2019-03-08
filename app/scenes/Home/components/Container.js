import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform, Share } from 'react-native'
import { NavigationActions } from 'react-navigation'

import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { validateEmail, validatePassword } from '../../../utils/validations'
import CustomDropDown from '../../../components/CustomDropDown'
import CountriesList from '../../../utils/countries.json'
import { COLORS } from '../../../utils/styles';
import User from '../../../store/User'
import CountDown from 'react-native-countdown-component';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 40,
    marginTop: 30,
  },
  questionButton: {
    position: 'absolute',
    right: 15,
    top: 25,
  },
  questionView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  questionImage: {
    width: 22,
    height: 22,
    margin: 8,
  },
  topView: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  gameText: {
    color: 'white',
    fontSize: 18,
    marginTop: 15,
    fontFamily: "Roboto-Medium",
  },
  timeText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 5,
    fontFamily: "Roboto-Medium",
  },
  middleView: {
    flex: 1,
    width: dimensions.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 8,
  },
  middleView1: {
    flex: 1.3,
    width: dimensions.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: COLORS.APP_GREY,
    borderBottomWidth: 1,
  },
  userImage: {
    width: dimensions.SCREEN_HEIGHT * 0.11,
    height: dimensions.SCREEN_HEIGHT * 0.11,
    marginTop: 5,
  },
  userName: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
  },
  settingButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  settingImage: {
    width: 30,
    height: 30,
  },
  middleView2: {
    flex: 1,
    width: dimensions.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: COLORS.APP_GREY,
    borderBottomWidth: 1,
  },
  balanceTitle: {
    color: COLORS.APP_GREY,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 5,
    fontFamily: "Roboto-Medium",
  },
  balanceText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '800',
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
  },
  middleView3: {
    flex: 1,
    width: dimensions.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  powerUpsRow: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  likeImage: {
    width: dimensions.SCREEN_HEIGHT * 0.09,
    height: dimensions.SCREEN_HEIGHT * 0.09,
    marginLeft: dimensions.SCREEN_WIDTH * 0.03,
    marginRight: 10,
  },
  likesView: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_BACKGROUND,
    borderRadius: 16,
  },
  likesText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },
  getMoreview: {
    height: dimensions.SCREEN_HEIGHT * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: COLORS.APP_GREY,
    borderWidth: 1,
  },
  getMoreText: {
    color: COLORS.APP_GREY,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },

  bottomView: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 8,
  },
  buttonView: {
    width: dimensions.SCREEN_WIDTH * 0.4,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.APP_FADE_BLUE,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },


  button: {
    width: dimensions.SCREEN_WIDTH * 0.72,
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_RED,
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
  buttonSkip: {
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.APP_BORDER,
  },
  buttonSkipText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 22,
    fontFamily: "Roboto-Medium",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTimerFinsh: false,
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

  inviteUsers() {
      Share.share({
        title: 'Invite Friends on SK Trivia Quiz',
        message: 'Hello Friends,\nCome join me to play quiz.\nhttps://www.google.com/',
      },{
        dialogTitle: 'Invite Friends on SK Trivia Quiz'
      })
  }

  about(loogInUserType, userData) {
    // if (loogInUserType === 'guest') {
    // this.chackForLogin()
    // } else {
    this.props.navigation.navigate('About', {gameId: userData.gameId, loogInUserType: loogInUserType})
   // }
  }

  setting(loogInUserType) {
    if (loogInUserType === 'guest') {
      this.chackForLogin()
    } else {
      this.props.navigation.navigate('Settings')    
    }
  }

  leaderBoard(loogInUserType) {
    // if (loogInUserType === 'guest') {
    //   this.chackForLogin()
    // } else {
      console.log('======', this.props.loginUserProfile)
      this.props.navigation.navigate('Leaderboard', {loginUserProfile: this.props.loginUserProfile, loogInUserType: loogInUserType})
    //  }
  }

  gameOn(loogInUserType, userData) {
    if (loogInUserType === 'guest') {
      this.chackForLogin()
    } else {
      this.props.navigation.navigate('GameOn', {gameId: userData.gameId})
      }
    // this.props.navigation.navigate('Winners', {gameId: userData.gameId})
  }
  gotoLoginScreen(loogInUserType) {
    this.login()
    // this.props.navigation.navigate('Winners', {gameId: userData.gameId})
  }

  cashOut(loogInUserType, userData) {
    if (loogInUserType === 'guest') {
      this.chackForLogin()
    } else {
      this.props.navigation.navigate('CashOut',{userData: userData})
      }
  }

  finishedTimer = () => {
    this.setState({ isTimerFinsh: true });
  }

  renderDateTimeCustomText = () => {
    const { datetime } = this.props;
    return (
      <Text style={styles.timeText}>{ datetime }</Text>
    )
  }

  renderTimer = () => {
    const { dateinsecond } = this.props;
    
    return (
      <CountDown
        until={ dateinsecond }
        size={30}
        onFinish={() => this.finishedTimer()}
        digitBgColor={'transparent'}
        digitTxtColor={COLORS.APP_RED}
        timeToShow={['M', 'S']}
        labelM={''}
        labelS={''}
        style={{ width: 80, height: 30, marginBottom: 10, padding: 0 }}
      />
    )
  }

  renderPlayGameButton = () => {
    const { loogInUserType, userData } = this.props
    return (
      <TouchableOpacity onPress={() => this.gameOn(loogInUserType, userData)}>
        <View style={[styles.buttonView, {backgroundColor: COLORS.APP_RED}]}><Text style={styles.buttonText}>Play Game</Text></View>
      </TouchableOpacity>
    )
  }

  // ShowAlertWithDelay=()=>{
  //   this.playButtomTimwer = setInterval(
  //     () => this.renderPlayGameButton(),
  //     clearInterval(this.playButtomTimwer),
  //           Alert.alert("Alert Shows After 5 Seconds of Delay.")

  //     ,
  //     2000
  //   );
  // }

  gotoLogin = () => {
    const { loogInUserType } = this.props
    return (
      <TouchableOpacity onPress={() => this.gotoLoginScreen(loogInUserType)}>
        <View style={[styles.buttonView, {backgroundColor: COLORS.APP_RED}]}><Text style={styles.buttonText}>Sign In to Play</Text></View>
      </TouchableOpacity>
    )
  }

  render() {
    const { isTimerFinsh } = this.state;
    const { loogInUserType, userData, loginUserProfile, isShowDatetime, liveGameExist, dateinsecond } = this.props
    let profileImg = '';
    if (loginUserProfile.avatar) {
      profileImg = { uri: loginUserProfile.avatar };
    } else {
      profileImg = images.icon;
    }
    let showplayGameButton = false;
    let showSigninUserButton = false;
    if (loogInUserType === 'guest') {
      showSigninUserButton =  true;
    }
    if (liveGameExist && userData.status === 'live' && isTimerFinsh) {
      showplayGameButton =  true;
    }
    const datetimeview = isShowDatetime ? this.renderDateTimeCustomText() : this.renderTimer()
    const playbuttonTest = showplayGameButton ? this.renderPlayGameButton() : datetimeview;
    const playbutton = dateinsecond < 0 ? this.renderPlayGameButton() : playbuttonTest;
        // const playbutton = dateinsecond < 0 ? (userData.status === 'live' ? this.renderPlayGameButton() : null) : playbuttonTest;
    const title =  userData.name ? `NEXT GAME: ${userData.name}` : 'NO LIVE GAME EXIST'; 
    const titlestatus =  showplayGameButton ? 'LIVE NOW' : title;

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.home_bg} style={styles.container} resizeMode="cover">
          
          <TouchableOpacity style={{ alignSelf: 'stretch' }}
           // onPress={() => this.gameOn(loogInUserType, userData)}
          >
          <View style={styles.topView}>
            <Image source={images.logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.gameText}>{ titlestatus }</Text>
            { showSigninUserButton ? this.renderDateTimeCustomText() : playbutton }
            <Text style={styles.timeText}>{userData.currency && userData.currency.symbol} {userData.prizeAmount && userData.prizeAmount} prize</Text>
            { showSigninUserButton ?  this.gotoLogin(loogInUserType) : null }

            <TouchableOpacity style={styles.questionButton} 
            onPress={() => this.about(loogInUserType, userData)}
            >
              <View style={styles.questionView}>
                <Image source={images.question_mark} style={styles.questionImage} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>

          <View style={styles.middleView}>
            <View style={styles.middleView1}>
              <Image source={profileImg} style={styles.userImage} resizeMode="contain" />
              <Text style={styles.userName}>{loginUserProfile.handle && loginUserProfile.handle}</Text>
              <TouchableOpacity style={styles.settingButton} onPress={() => this.setting(loogInUserType)}>
                <Image source={images.setting} style={styles.settingImage}/>
              </TouchableOpacity>
            </View>

            <View style={styles.middleView2}>
            <TouchableOpacity onPress={() => this.cashOut(loogInUserType, userData)}>
              <Text style={styles.balanceTitle}>BALANCE</Text>
              {loogInUserType !== 'guest' ?
              <Text style={styles.balanceText}>{userData.currency && userData.currency.symbol} {loginUserProfile.amount && loginUserProfile.amount}</Text>
               : 
               <Text style={styles.balanceText}>-</Text>
               }
              </TouchableOpacity>
            </View>

            <View style={styles.middleView3}>
              <Text style={styles.balanceTitle}>POWER UPS</Text>
              <View style={styles.powerUpsRow}>
                <TouchableOpacity>
                  <ImageBackground source={images.likes} style={styles.likeImage} resizeMode="contain" />
                  {loogInUserType !== 'guest' &&

                  <View style={styles.likesView}>
                    <Text style={styles.likesText}>2</Text>
                  </View>
                 }

                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.inviteUsers()}>
                  <View style={styles.getMoreview}>
                    <Text style={styles.getMoreText}>Get More</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => this.leaderBoard(loogInUserType)}>
              <View style={styles.buttonView}><Text style={styles.buttonText}>Leaderboard</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.inviteUsers()}>
              <View style={styles.buttonView}><Text style={styles.buttonText}>Inivte</Text></View>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </View>
    )
  }
}
