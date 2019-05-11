import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform, Keyboard } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { validateEmail, validatePassword } from '../../../utils/validations'
import CustomDropDown from '../../../components/CustomDropDown'
import CountriesList from '../../../utils/countries.json'
import { COLORS } from '../../../utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: -10,
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 80,
    marginTop: 30,
    right: 120
  },
  gameText: {
    color: COLORS.APP_WHITE,
    fontSize: 30,
    // fontWeight: '800',
    marginTop: 20,
    fontFamily: "Nunito-Bold",
    top: 255
  },
  gameTextBottom: {
    color: COLORS.APP_WHITE,
    fontSize: 17,
    // fontWeight: '800',
    marginTop: 20,
    fontFamily: "Nunito-Medium", 
    top: 110
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 60,
    borderRadius: 10,
    backgroundColor: COLORS.APP_WHITE,
    top: 285
  },
  countryPicButton: {
    flexDirection: 'row',
    height: Platform.select({ ios: 40, android: 45 }),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 0
  },
  countryCode: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 20,
    // fontWeight: '600',
    marginLeft: 10,
    fontFamily: "Nunito-Bold"
  },
    flag: {
      width: 15,
      height: 20
    },
  
  dashText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 15,
    // fontWeight: '900',
    marginHorizontal: 10
  },
  inputStyle: {
    width: dimensions.SCREEN_WIDTH * 0.5,
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 16,
    // fontWeight: '600',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "Nunito-Bold"
  },
  button: {
    width: dimensions.SCREEN_WIDTH * 0.72,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: "Nunito-Bold",
    elevation: 5,
    textAlign: 'center'
  },
  messageText: {
    color: '#cccccc',
    fontSize: 12,
    // fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    color: 'white',
    fontFamily: "Nunito-Bold"
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
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.APP_BORDER,
    top: -450,
    left: 85
  },
  buttonSkipText: {
    backgroundColor: 'transparent',
    color: COLORS.APP_WHITE,
    fontSize: 16,
    marginHorizontal: 32,
    fontFamily: "Nunito-Bold"
  },
  gradient: {
    width: dimensions.SCREEN_WIDTH * 0.72,
    paddingVertical: 10,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
      borderRadius: 10,
      padding: 10,
      top: 280
  },
  image: {
    height: 30,
    width: 40,
    paddingVertical: 10,
    marginLeft: 10
  }
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCountryPicker: false, // country picker toggle
      countryCode: '62',
      countryFlag: "🇮🇩",
      country: 'Indonesia',
      phone: '',
    }
  }


  checkValidations(phone) {
    // TO DO Menambah Validasi
    if (phone === '' || isNaN(Number(phone)) || phone.length < 8 || phone.length > 14) {
      Alert.alert('PESAN!!', 'Mohon Masukkan Nomor \n------------------------------------------\nSmartphonemu Dengan Benar')
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
          <Text style={styles.gameText}>Final Budaya</Text>

          <View style={styles.inputView}>
            <TouchableOpacity style={styles.countryPicButton} onPress={() => {
              Keyboard.dismiss()
              this.setState({ showCountryPicker: true })
              }}>
              <Image source={images.indonesia} style={styles.image} />
              <Text style={styles.countryCode}>+62</Text>
            </TouchableOpacity>
            <Text style={styles.countryCode}>-</Text>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Nomor Smartphonemu"
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
          <LinearGradient
    colors={['#3584A7', '#3584A7','#4CC3FF']}   
    start={{ x: 0.0, y: 0.5 }}         
    end={{ x: 1, y: 0.5 }}
    style={styles.gradient}>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.checkValidations(phone)}>
            <Text style={styles.buttonText}>Daftarkan</Text>
          </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.gameTextBottom}>Dengan Syarat Dan Ketentuan Berlaku</Text>
          
          <Text style={styles.messageText}>{''}</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonSkip} onPress={() => this.checkGuest()}>
            <Text style={[styles.buttonSkipText]}>Tanpa Akun</Text>
          </TouchableOpacity>
        </ImageBackground>
        {showCountryPicker && <CustomDropDown
          
          close={() => this.setState({ showCountryPicker: false })}
        />}
          <View style={styles.backView}>
          {/* <BackButton action={() => this.props.navigation.goBack()} /> */}
          
        </View>
      </View>
    )
  }
}
