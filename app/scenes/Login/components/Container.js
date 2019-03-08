import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform, Keyboard } from 'react-native'
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { validateEmail, validatePassword } from '../../../utils/validations'
import CustomDropDown from '../../../components/CustomDropDown'
import CountriesList from '../../../utils/countries.json'
import { COLORS } from '../../../utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginTop: 30,
  },
  gameText: {
    color: 'white',
    fontSize: 32,
    // fontWeight: '800',
    marginTop: 20,
    fontFamily: "Roboto-Medium",
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 60,
    borderRadius: 30,
    backgroundColor: '#eeeeee',
  },
  countryPicButton: {
    flexDirection: 'row',
    height: Platform.select({ ios: 40, android: 45 }),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 0,
  },
  countryCode: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 15,
    // fontWeight: '600',
    marginLeft: 5,
    fontFamily: "Roboto-Medium",
  },
  dashText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 15,
    // fontWeight: '900',
    marginHorizontal: 10,
  },
  inputStyle: {
    width: dimensions.SCREEN_WIDTH * 0.5,
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 16,
    // fontWeight: '600',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "Roboto-Medium",
  },
  button: {
    width: dimensions.SCREEN_WIDTH * 0.72,
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_RED,
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
    // fontWeight: '900',
    fontFamily: "ChalkboardSE-Bold",
  },
  messageText: {
    color: '#cccccc',
    fontSize: 12,
    // fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    color: 'white',
    fontFamily: "Roboto-Medium",
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
    // fontWeight: '800',
    marginHorizontal: 22,
    fontFamily: "Roboto-Medium",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCountryPicker: false, // country picker toggle
      countryCode: '91',
      countryFlag: "🇮🇳",
      country: 'India',
      phone: '',
    }
  }

  checkValidations(phone) {
    // TO DO Add validations
    if (phone === '' || isNaN(Number(phone)) || phone.length < 8 || phone.length > 14) {
      Alert.alert('Message', 'Please enter correct phone number')
      return
    }
    this.props.performLogin(phone, this.state.countryCode)
  }

  checkGuest() {
    // TO DO Add validations
    this.props.navigation.navigate('Home', { loogInUserType: 'guest' })
  }

  render() {
    const { showCountryPicker, countryCode, countryFlag, phone } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.loginBG} style={styles.container} resizeMode="cover">
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.gameText}>Live trivia game</Text>

          <View style={styles.inputView}>
            <TouchableOpacity style={styles.countryPicButton} onPress={() => {
              Keyboard.dismiss()
              this.setState({ showCountryPicker: true })
              }}>
              <Text style={styles.countryCode}>{countryFlag}</Text>
              <Text style={styles.countryCode}>+{countryCode}</Text>
            </TouchableOpacity>
            <Text style={styles.dashText}>-</Text>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Your Phone Number"
              placeholderTextColor="lightgrey"
              style={styles.inputStyle}
              value={phone}
              onChangeText={text => this.setState({ phone: text })}
              autoCorrect={false}
              autoCapitalize="none"
              selectionColor="lightgrey"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.checkValidations(phone)}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.messageText}>{'By tapping Get Started, an SMS sent on your phone.\nMessage & data rates may apply.'}</Text>
        </ImageBackground>
        {showCountryPicker && <CustomDropDown
          title={'Select your country'}
          listData={CountriesList.map((country) => `${country.flag} ${country.name} ${`(+${country.callingCode})`}  `)}
          onSelectOption={(item, index) => {
            const country = CountriesList[index]
            this.setState({
              country: country.name,
              countryFlag: country.flag,
              countryCode: `${country.callingCode}`
            })}
          }
          close={() => this.setState({ showCountryPicker: false })}
        />}
          <View style={styles.backView}>
          {/* <BackButton action={() => this.props.navigation.goBack()} /> */}
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonSkip} onPress={() => this.checkGuest()}>
            <Text style={[styles.buttonSkipText]}>Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
