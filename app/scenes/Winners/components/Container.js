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
import BackButton from '../../../components/BackButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backView: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    marginTop: 40,
    width: dimensions.SCREEN_WIDTH * 0.4,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.WINNERBUTTTON,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: "Roboto-Medium",
  },
  middleView1: {
    height: 150,
    marginLeft: -170,
    width: dimensions.SCREEN_WIDTH ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView2: {
    height: 150,
    marginRight: -170,
    marginTop: -70,
    width: dimensions.SCREEN_WIDTH ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView3: {
    marginTop: 40,
    height: 150,
    width: dimensions.SCREEN_WIDTH ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: dimensions.SCREEN_HEIGHT * 0.11,
    height: dimensions.SCREEN_HEIGHT * 0.11,
    marginTop: 5,
    borderRadius: (dimensions.SCREEN_HEIGHT * 0.11) / 2,

  },
  userName: {
    marginTop: 10,
    color: COLORS.APP_WHITE,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: "Roboto-Medium",
  },
  rupeButtonView: {
    marginTop: 25,
    borderRadius: 25,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS.APP_FADE_BLUE,
  },
  HomeButton: {
    position: 'absolute',
    bottom: 20,
  },
  homeView: {
    width: dimensions.SCREEN_WIDTH * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgb(126,140,175)',
    borderRadius: 40,
    backgroundColor: COLORS.APP_FADE_BLUE,
  },
  homeText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    color: 'white',
  },
  logView: {
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
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  gotoHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home',
        params: { loogInUserType: '' }
      }),
      ],
      key: null,
    })
    this.props.navigation.dispatch(resetAction)

    return
  }


  render() {
    const { navigation, winners, userCount, isLoading } = this.props
    const title = `${winners.length} Winners!`
    let winnerObject1;
    let winnerObject2;
    let winnerObject3;
    let profileImg1 = '';
    let profileImg2 = '';
    let profileImg3 = '';

    if (winners.length > 0) {
      winnerObject1 = winners[0];
      if (winnerObject1.avatar) {
        profileImg1 = { uri: winnerObject1.avatar };
      } else {
        profileImg1 = images.icon;
      }
    }
    
    if (winners.length > 1) {
      winnerObject2 = winners[1];
      if (winnerObject2.avatar) {
        profileImg2 = { uri: winnerObject2.avatar };
      } else {
        profileImg2 = images.icon;
      }
    }

    if (winners.length > 2) {
      winnerObject3 = winners[2];
      if (winnerObject3.avatar) {
        profileImg3 = { uri: winnerObject3.avatar };
      } else {
        profileImg3 = images.icon;
      }
    }


    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.winnerbg} style={styles.container} resizeMode="cover">
            <View style={styles.backView}>
            {/* <BackButton action={() => this.props.navigation.goBack()} /> */}
            </View>
            {!isLoading && winners.length > 0 &&
            <View style={styles.buttonView}><Text style={styles.buttonText}>{ title }</Text></View>
            }
            {!isLoading && winners.length > 0 &&
            <View style={styles.middleView1}>
              <Image source={ profileImg1 } style={styles.userImage} resizeMode="contain" />
              <Text style={styles.userName}>{winnerObject1 && winnerObject1.handle}</Text>
              <View style={[styles.rupeButtonView, { marginTop: 1, backgroundColor: COLORS.APP_WHITE }]}>
                <Text style={[styles.buttonText, { color: 'black' }]}>{'₹'}{ winnerObject1 ? winnerObject1.amount : '' }</Text>
              </View>
            </View>
            }
            {!isLoading && winners.length > 0 &&
            <View style={styles.middleView2}>
              <Image source={ profileImg2 } style={styles.userImage} resizeMode="contain" />
              <Text style={styles.userName}> {winnerObject2 && winnerObject2.handle} </Text>
              <View style={[styles.rupeButtonView, { marginTop: 1, backgroundColor: COLORS.APP_WHITE }]}>
                <Text style={[styles.buttonText, { color: 'black' }]}>{'₹'}{ winnerObject2 ? winnerObject2.amount : '' }</Text>
              </View>
            </View>
            }
           {!isLoading && winners.length > 0 &&

            <View style={styles.middleView3}>
              <Image source={ profileImg3 } style={styles.userImage} resizeMode="contain" />
              <Text style={styles.userName}> {winnerObject3 && winnerObject3.handle} </Text>
              <View style={[styles.rupeButtonView, { marginTop: 1, backgroundColor: COLORS.APP_WHITE }]}>
                <Text style={[styles.buttonText, { color: 'black' }]}>{'₹'}{ winnerObject3 ? winnerObject3.amount : '' }</Text>
              </View>
            </View>
           }
            <TouchableOpacity style={styles.HomeButton} onPress={() => this.gotoHome()}>
            <View style={styles.homeView}>
              <Text style={styles.homeText}>Go To Home</Text>  
            </View>
          </TouchableOpacity>
          
        </ImageBackground>
        {/* {!isLoading && winners.length > 0 && */}

        <View style={styles.logView}>
          {/* <BackNew action={() => this.props.navigation.goBack()} /> */}
          {/* <Text style={styles.headerText}>Verify Code</Text> */}
          <View style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
          <Image source={ images.user } style={{width: 25, height: 25}} resizeMode="contain" />
          <Text style={{color: 'white', fontSize: 18, fontFamily: "Roboto-Medium", fontWeight: '800',}}>{userCount}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}> </Text>
          </TouchableOpacity>
          <Image source={ images.skLogo } style={{width: 30, height: 30}} resizeMode="contain" />
          {/* <Image source={images.logo} style={styles.logo} resizeMode="contain" /> */}

        </View>
        {/* } */}
      </View>
    )
  }
}
