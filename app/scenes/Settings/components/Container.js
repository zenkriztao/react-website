import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, Alert } from 'react-native'
import images from '../../../assets/images/images'
import BackButton from '../../../components/BackButton'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import { galleryPicker, cameraPicker } from '../../../components/ImagePickerComponent';
import User from '../../../store/User'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.APP_WHITE,
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

  containerView: {
    flex: 1,
    alignItems: 'center',
  },
  userImageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  userImage: {
    width: dimensions.SCREEN_HEIGHT * 0.15,
    height: dimensions.SCREEN_HEIGHT * 0.15,
    borderRadius: (dimensions.SCREEN_HEIGHT * 0.15) / 2,
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: 'black',
  },

  userNameText: {
    marginTop: 10,
    fontSize: 28,
    fontFamily: "Roboto-Medium",
    textAlign: 'center',
    color: 'black',
  },
  referalHeaderText: {
    marginTop: 35,
    fontSize: 15,
    fontFamily: "Roboto-Medium",
    textAlign: 'center',
    color: 'rgb(126,140,175)',
  },
  referalInputView: {
    width: dimensions.SCREEN_WIDTH * 0.75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: 'rgb(235,235,239)',
    marginTop: 10,
  },
  inputStyle: {
    flex: 1,
    height: Platform.select({ ios: 40, android: 45 }),
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "Roboto-Medium",
  },
  helpButton: {
    
  },
  helpIcon: {
    width: 25,
    height: 25,
  },

  logoutButton: {
    position: 'absolute',
    bottom: 20,
  },
  logoutView: {
    width: dimensions.SCREEN_WIDTH * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgb(126,140,175)',
    borderRadius: 40,
  },
  logoutText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    color: 'rgb(126,140,175)',
  },
  submitText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    color: 'rgb(126,140,175)',
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      referalCode: '',
      userImage: images.icon,
      imageMultipartBody: {},
      isShowDone: false,
    }
  }
  showSumbitButton () {
    return (
    <TouchableOpacity 
    style={[styles.referalInputView, {borderColor: 'rgb(126,140,175)', marginTop: 15, borderWidth: 1, width: dimensions.SCREEN_WIDTH * 0.50, height: Platform.select({ ios: 50, android: 55 }),}]}
    onPress={() => this.submitAction()}>
      {/* <View style={styles.submitView}> */}
        <Text style={styles.submitText}>Submit</Text>  
      {/* </View> */}
    </TouchableOpacity>
    )
}

  submitAction() {
    // Alert.alert('Work In Progress')
    const { loginUserProfile } = this.props

    if (this.state.referalCode === '' || !this.state.referalCode) {
      Alert.alert('Message', 'Please enter correct referral Code')
      return
    }
    this.props.updateUserName(loginUserProfile.handle && loginUserProfile.handle, this.state.referalCode)

  }
  informationAbout() {
    Alert.alert('Referral code', `Enter a friend's SK username as your referral code.`)
  }
  askForLogout() {
    Alert.alert('Are sure you want to logout?', '', [{
      text: 'cancel',
    },
    {
      text: 'logout',
      onPress: () => this.logout(),
      style: 'destructive'
    }
  ])
  }

  logout() {
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

  openPickerOptions() {
    Alert.alert('Choose image from:', '',[
      {
        text: 'Camera Roll',
        onPress: () => this.pickFromCameraRoll()
      },
      {
        text: 'Photo Library',
        onPress: () => this.pickFromPhotoLibrary()
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'destructive',
      },
    ])
  }

  setImage = (uri, imageMultipartBody) => {
    this.setState({ imageMultipartBody, userImage: { uri } })
    this.props.updateProfile("", "", imageMultipartBody)

  }

  pickFromPhotoLibrary() {
    galleryPicker(this.setImage, 'avatar')
  }
  
  pickFromCameraRoll() {
    cameraPicker(this.setImage, 'avatar')
  }

  render() {
    const { navigation, loginUserProfile, isShowreferralHandle, isLoading } = this.props
    const { referalCode, userImage } = this.state
    console.log('==========@@@@@@', isShowreferralHandle)
    let profileImg = '';
    if (loginUserProfile.avatar) {
      profileImg = { uri: loginUserProfile.avatar };
    } else {
      profileImg = this.state.userImage;
    }
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Settings</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>

        <View style={styles.containerView}>
          <TouchableOpacity style={styles.userImageButton} onPress={() => this.openPickerOptions()}>
            <Image source={images.edit} style={styles.editIcon} resizeMode="cover" />
            <Image source={profileImg} style={styles.userImage} resizeMode="cover" />
          </TouchableOpacity>

          <Text style={styles.userNameText}>{loginUserProfile.handle && loginUserProfile.handle}</Text>
          </View>
          {!isLoading && isShowreferralHandle !== true ?
          <View style={[styles.containerView, {alignItems: 'center', flex: 2.5}]}>
          <Text style={styles.referalHeaderText}>APPLY REFERRAL CODE</Text>
          <View style={styles.referalInputView}>
            <TextInput
              style={styles.inputStyle}
              value={referalCode}
              onChangeText={text => this.setState({ referalCode: text,
                isShowDone: true
              })}
              placeholder="Referral code"
              placeholderTextColor="rgb(126,140,175)"
              selectionColor="rgb(126,140,175)"
              returnKeyType="search"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.helpButton} onPress={() => this.informationAbout()}>
              <Image style={styles.helpIcon} source={images.help}/>
            </TouchableOpacity>
          </View>
          {this.state.isShowDone &&  this.showSumbitButton() }
          </View>
          : 
          null
          }
                  
         
          <TouchableOpacity style={styles.logoutButton} onPress={() => this.askForLogout()}>
            <View style={styles.logoutView}>
              <Text style={styles.logoutText}>Logout</Text>  
            </View>
          </TouchableOpacity>
        </View>
    )
  }
}
