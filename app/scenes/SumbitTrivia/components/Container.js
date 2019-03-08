import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import images from '../../../assets/images/images'
import BackButton from '../../../components/BackButton'
import dimensions from '../../../utils/dimensions'
import { COLORS, defaultStyle } from '../../../utils/styles';
import { galleryPicker, cameraPicker } from '../../../components/ImagePickerComponent';
import CustomDropDown from '../../../components/CustomDropDown'
import { validateName } from '../../../utils/validations'

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
    // alignItems: 'center',
  },
  userImageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    fontSize: 22,
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
    width: dimensions.SCREEN_WIDTH * 0.80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: 'rgb(246,246,246)',
    marginTop: 10,
  },
  selctInputView: {
    width: dimensions.SCREEN_WIDTH * 0.80,
    height: Platform.select({ ios: 40, android: 45 }),
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
    height: Platform.select({ ios: 100, android: 110 }),
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(144, 146, 167)',
    fontFamily: "Roboto-Medium",
  },
  inputSingleStyle: {
    flex: 1,
    height: Platform.select({ ios: 40, android: 45 }),
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(144, 146, 167)',
    fontFamily: "Roboto-Medium",
  },
  selctOptionStyle: {
    flex: 1,
    // height: Platform.select({ ios: 40, android: 45 }),
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(138, 140, 162)',
    fontFamily: "Roboto-Medium",
  },
  helpButton: {
    
  },
  helpIcon: {
    width: 25,
    height: 25,
  },

  submitButton: {
    position: 'absolute',
    bottom: 20,
  },
  submitView: {
    width: dimensions.SCREEN_WIDTH * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgb(126,140,175)',
    borderRadius: 40,
  },
  submitText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    color: 'white',
  },
  scollContainer: {
    ...defaultStyle,
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
  tipView: {
    width: 25,
    height: 30,
    // position: 'absolute',
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingLeft: 30,
    paddingRight: 10,
    marginLeft: 22,
    top: 5,
    left: 0,
    // backgroundColor: 'yellow'
  },
  buttonSkip: {
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
   // borderWidth: 1,
  //  borderColor: COLORS.APP_BORDER,
        backgroundColor: 'rgb(255,192,0)'

  },
  buttonSkipText: {
    color: 'black',
    fontSize: 16,
    // fontWeight: '800',
    marginHorizontal: 22,
    fontFamily: "Roboto-Medium",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false, // country picker toggle
      options: 'Select your category',
      question: '',
      answer: '',
      aOptionValue: '',
      bOptionValue: '',
      cOptionValue: '',
      category: '',
      userImage: images.icon,
      imageMultipartBody: {},
    }
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

  submitAction() {
    const { question, answer, aOptionValue, bOptionValue, cOptionValue, options} = this.state

    if (question === '' || question.length < 3) {
      Alert.alert('Message', 'Please enter correct question')
      return
    }
    if (answer === '' || answer.length < 1) {
      Alert.alert('Message', 'Please enter correct answer')
      return
    }
    if (aOptionValue === '' || aOptionValue.length < 1) {
      Alert.alert('Message', 'Please enter correct A option')
      return
    }
    if (aOptionValue === '' || bOptionValue.length < 1) {
      Alert.alert('Message', 'Please enter correct B option')
      return
    }
    if (cOptionValue === '' || cOptionValue.length < 1) {
      Alert.alert('Message', 'Please enter correct B option')
      return
    }
    if (options === 'Select your category' || options.length < 1) {
      Alert.alert('Message', 'Please select correct category')
      return
    }
    this.props.performSubmit({question, answer, aOptionValue, bOptionValue, cOptionValue, options});

  }

  setImage = (uri, imageMultipartBody) => {
    this.setState({ imageMultipartBody, userImage: { uri } })
  }

  pickFromPhotoLibrary() {
    galleryPicker(this.setImage, 'avatar')
  }
  
  pickFromCameraRoll() {
    cameraPicker(this.setImage, 'avatar')
  }

  render() {
    const { navigation, optionsList, liveUserCount } = this.props
    const { question, answer, aOptionValue, bOptionValue, cOptionValue, options, showPicker} = this.state
    console.log('=================>', liveUserCount);
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Submit trivia</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>     
        <KeyboardAwareScrollView
          style={{ width: dimensions.SCREEN_WIDTH }}
          contentContainerStyle={styles.scollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.userNameText}>{'You have been awarded:'}</Text>
          <TouchableOpacity style={styles.userImageButton} onPress={() => console.log('Done')}>
            <Image source={images.submitlogo} style={styles.userImage} resizeMode="cover" />
          </TouchableOpacity>
        <View style={{flexDirection: 'row', width: dimensions.SCREEN_WIDTH, justifyContent: 'center'}}>
          <Text style={styles.userNameText}>{liveUserCount && liveUserCount.liveUserCount} {'SK'} </Text>
          <Text style={[styles.userNameText, {fontSize: 18, marginTop: 13}]}> {'trivia coins'} </Text>

          </View>
          <View style={[styles.containerView, {marginTop: 10}]}>
          <View style={[styles.referalInputView, {borderRadius: 10, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
          {/* <View style={styles.tipView}> */}
          {/* <BackButton action={() => this.props.navigation.goBack()} /> */}
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonSkip} onPress={() => {}}>
            <Text style={[styles.buttonSkipText]}>TIP</Text>
          </TouchableOpacity>
        {/* </View> */}
          <Text 
            style={[styles.inputStyle, {color: 'black', height: 50, fontSize: 12, marginTop: 20}]}
          >Earn more SK reward coins by simply submitting a fact or specific think you like into an intriguing question, with proper grammar and spelling. 
          </Text>
            </View>
</View>
        <View style={[styles.containerView, {marginTop: 0}]}>
          <View style={[styles.referalInputView, {borderRadius: 10}]}>
            <TextInput
              style={styles.inputStyle}
              numberOfLines={5}
              maxLength={150}
              multiline={true}
              value={question}
              onChangeText={text => this.setState({ question: text })}
              placeholder="Type your question here..."
              placeholderTextColor="'rgb(144, 146, 167)'"
              selectionColor="'rgb(144, 146, 167)'"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.referalInputView}>
            <TextInput
              style={styles.inputSingleStyle}
              maxLength={15}
              numberOfLines={1}
              value={answer}
              onChangeText={text => this.setState({ answer: text ,
                aOptionValue: text
              })}
              placeholder="Correct Answer"
              placeholderTextColor="'rgb(144, 146, 167)'"
              selectionColor="'rgb(144, 146, 167)'"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          {/* <View style={styles.referalInputView}>
            <TextInput
              style={styles.inputSingleStyle}
              maxLength={15}
              numberOfLines={1}
              value={aOptionValue}
              onChangeText={text => this.setState({ aOptionValue: text })}
              placeholder="Option A"
              placeholderTextColor="rgb(126,140,175)"
              selectionColor="rgb(126,140,175)"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View> */}
          <View style={styles.referalInputView}>
            <TextInput
              style={styles.inputSingleStyle}
              maxLength={15}
              numberOfLines={1}
              value={bOptionValue}
              onChangeText={text => this.setState({ bOptionValue: text })}
              placeholder="Option B"
              placeholderTextColor="'rgb(144, 146, 167)'"
              selectionColor="'rgb(144, 146, 167)'"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.referalInputView}>
            <TextInput
              style={styles.inputSingleStyle}
              maxLength={15}
              numberOfLines={1}
              value={cOptionValue}
              onChangeText={text => this.setState({ cOptionValue: text })}
              placeholder="Option C"
              placeholderTextColor="'rgb(144, 146, 167)'"
              selectionColor="'rgb(144, 146, 167)'"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          {/* <View style={[styles.referalInputView, {backgroundColor: white, borderWidth: 1}]}> */}
          <TouchableOpacity 
          style={[styles.referalInputView, { height: Platform.select({ ios: 50, android: 55 }),}]}
          onPress={() => this.setState({ showPicker: true })}>
                <Text style={[styles.selctOptionStyle]}>{options}</Text>
            </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.referalInputView, {borderColor: 'rgb(126,140,175)',backgroundColor:'rgb(180,181,194)', marginTop: 15, marginBottom: 15, borderWidth: 1, height: Platform.select({ ios: 50, android: 55 }),}]}
          onPress={() => this.submitAction()}>
            {/* <View style={styles.submitView}> */}
              <Text style={styles.submitText}>Submit</Text>  
            {/* </View> */}
          </TouchableOpacity>


          </View>
        {/* </View> */}
       
        </KeyboardAwareScrollView>
        {showPicker && <CustomDropDown
          title={'Select your category'}
          listData={optionsList.map((options) => `${options}`)}
          onSelectOption={(item, index) => {
            const options = optionsList[index]
            this.setState({
              options: options,
            })}
          }
          close={() => this.setState({ showPicker: false })}
        />}
       
         
      </View>
    )
  }
}
