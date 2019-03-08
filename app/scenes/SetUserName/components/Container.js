import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AuthService from '../../../api/auth'
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import BackNew from '../../../components/BackNew';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginLeft: 20,
  },
  backView: {
    width: dimensions.SCREEN_WIDTH,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    top: 12,
    left: 0
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
  },
  button: {
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_RED,
    borderWidth: 1,
    borderColor: COLORS.APP_BORDERNEXT,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 20,
    fontFamily: "Roboto-Medium",
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: "Roboto-Medium",
    marginTop: 5,
  },
  inputView: {
    width: dimensions.SCREEN_WIDTH * 0.7 + 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 20,
  },
  inputCover: {
    flex: 1,
    backgroundColor: '#eeeeee',
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  inputStyle: {
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "Roboto-Medium",
  },
  statusImage: {
    width: 35,
    height: 35,
    marginLeft: 8,
  },
  messageText: {
    color: '#cccccc',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 25,
    fontFamily: "Roboto-Medium",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userName: '',
      userNameAvailable: false,
      referalCode: '',
    }
  }

  checkUserName(userName) {
    AuthService.checkUserName(userName).then((response) => {
      if (response.data && response.data.status === 'success') {
        if (this.state.userName.length <= 4) {
          this.setState({ userNameAvailable: false })
          return
        }
        this.setState({ userNameAvailable: true })
      }
      if (response.data && response.data.status === 'error') {
        this.setState({ userNameAvailable: false })
      }
    }).catch((error) => {
    })
  }

  userNameVerified() {
    if (this.state.userName === '' || !this.state.userNameAvailable) {
      Alert.alert('Message', 'Please enter correct user name')
      return
    }
    this.props.updateUserName(this.state.userName, this.state.referalCode)
  }

  render() {
    const { userName, isLoading, userNameAvailable, referalCode } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.signUpBg} style={styles.container} resizeMode="cover">
          <Text style={styles.headerText}>Pick a username</Text>
          <View style={styles.inputView}>
            <View style={styles.inputCover}>
              <TextInput
                keyboardType="default"
                placeholder="Enter username"
                placeholderTextColor="lightgrey"
                style={styles.inputStyle}
                value={userName}
                onChangeText={text => {
                  this.setState({ userName: text })
                  if (text === '') return
                  this.checkUserName(text)
                }}
                autoCorrect={false}
                autoCapitalize="none"
                selectionColor="lightgrey"
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
            {userName !== '' && !isLoading &&<Image source={userNameAvailable ? images.ok : images.cancel} style={styles.statusImage} resizeMode="contain" />}
          </View>
          <Text
            style={[styles.detailText, { color: userNameAvailable ? 'white' : 'red' }]}
          >
          {userName !== '' && !isLoading ?
            userNameAvailable ? 'user name is available' : 'user name is not available' : ' '}</Text>
          <View style={[styles.inputCover, { flex: null, marginTop: 15 }]}>
              <TextInput
                keyboardType="default"
                placeholder="Referal Code"
                placeholderTextColor="lightgrey"
                style={[styles.inputStyle, { flex: null, width: dimensions.SCREEN_WIDTH * 0.7 }]}
                value={referalCode}
                onChangeText={text => this.setState({ referalCode: text })}
                autoCorrect={false}
                autoCapitalize="none"
                selectionColor="lightgrey"
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
            <Text style={styles.messageText}>{'By signing up you agree to he Terms, Privacy Policy and Rules.'}</Text>
        </ImageBackground>
        <View style={styles.backView}>
          <BackNew action={() => this.props.navigation.goBack()} />
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!userNameAvailable}
            style={styles.button}
            onPress={() => this.userNameVerified()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
