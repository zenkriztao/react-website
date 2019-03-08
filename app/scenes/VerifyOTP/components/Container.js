import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
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
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: "Roboto-Medium",
    // marginBottom: 10,
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
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: "Roboto-Medium",
    marginBottom: 5,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#eeeeee',
  },
  inputStyle: {
    width: dimensions.SCREEN_WIDTH * 0.7,
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "Roboto-Medium",
  },  
  messageText: {
    color: '#cccccc',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 30,
    fontFamily: "Roboto-Medium",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      otp: '',
    }
  }

  checkValidations(otp) {
    // TO DO Change
    if (otp.length !== 4 || isNaN(Number(otp))) {
      Alert.alert('Message', 'Please enter 4 digit verification code.')
      return
    }
    this.props.verifyOTP(otp)
  }

  render() {
    const { otp } = this.state
    const { phone, countryCode } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.loginBG} style={styles.container} resizeMode="cover">
        <Text style={styles.detailText}>{`Please enter the verification code sent to +${countryCode}-${phone}`}</Text>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Verify Code"
              placeholderTextColor="lightgrey"
              style={styles.inputStyle}
              value={otp}
              maxLength={4}
              onChangeText={text => this.setState({ otp: text })}
              autoCorrect={false}
              autoCapitalize="none"
              selectionColor="lightgrey"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.messageText}>{'By signing up you agree to the Terms, Privacy Policy and Rules.'}</Text>
        </ImageBackground>
        <View style={styles.backView}>
          <BackNew action={() => this.props.navigation.goBack()} />
          <Text style={styles.headerText}>Verify Code</Text>

          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.checkValidations(otp)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
