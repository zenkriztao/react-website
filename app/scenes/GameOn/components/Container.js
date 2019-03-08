import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GameStateTypes } from '../../../utils/constants'
import TimerView from './TimerView'
import OptionView from './OptionView'
import ExplanationView from './ExplanationView'
import SponsoredView from './SponsoredView'
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { COLORS, defaultStyle } from '../../../utils/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scollContainer: {
    ...defaultStyle,
  },
  topView: {
    width: dimensions.SCREEN_WIDTH * 0.92,
    ...defaultStyle,
    padding: 10,
    marginVertical: 15,
    backgroundColor: COLORS.GAME_DETAIL_VIEW_GREY,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.APP_GREY,
  },
  questionView: {
    alignSelf: 'stretch',
    ...defaultStyle,
    marginVertical: 15,
  },
  questionText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  nextQuestionView: {
    alignSelf: 'stretch',
    ...defaultStyle,
    marginVertical: 1,
  },
  nextQuestionText: {
    color: COLORS.APP_RED,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  nextQuestionTimeText: {
    color: COLORS.APP_RED,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '800',
  },

  explainationView: {
    width: dimensions.SCREEN_WIDTH * 0.92,
    padding: 10,
    marginVertical: 15,
    backgroundColor: COLORS.APP_BACKGROUND,
    borderRadius: 10,
  },
  explainationHeaderText: {
    color: COLORS.APP_WHITE,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '800',
    marginBottom: 2,
  },
  explainationText: {
    color: COLORS.APP_WHITE,
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '500',
  },

  copyRightView: {
    width: dimensions.SCREEN_WIDTH * 0.92,
    // flexDirection: 'row',
    ...defaultStyle,
    marginVertical: 3,
  },
  copyRightText: {
    color: COLORS.APP_BORDER,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },


  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },
  logView: {
    width: dimensions.SCREEN_WIDTH * 0.92,
    height: 40,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    top: 5,
    left: 0
  },
  gameText: {
    color: 'black',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 20,
    fontFamily: "Roboto-Medium",
  },
})


const setNewOption = (options, deselectAll, currentGameState) => {
  if (options != null && options != undefined) {
    // console.log('^^^^^^^^^^^^^', options)
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    console.log('^^^^^^^^^^^^^', element);
    <OptionView
    currentGameState={currentGameState}
    optionValue={element.optionValue && element.optionValue}
    isSelected={false && deselectAll}
  />
  }
}
}

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getOptionView(options) {
    const {
      currentGameState,
      selectOption,
      selectedOption,
      gameExplanationData,
    } = this.props

    if (options && options.length > 0) {
      let optionsView = []

      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        const isSelected = option.optionId === selectedOption
        optionsView.push(
          <OptionView
            currentGameState={currentGameState}
            optionValue={option.optionValue}
            optionId={option.optionId}
            isSelected={isSelected}
            selectOption={selectOption}
            gameExplanationData={gameExplanationData}
            isdisabled={true}
          />
        )
      }
      return optionsView
    }

    return null
  }

  render() {
    const {
      currentGameState,
      liveGameTimeRemaining,
      nextGameStartsIn,
      nextGameQuestionData,
      gameExplanationData,
      GameSponserData,
      userCount,
    } = this.props

    const deselectAll = currentGameState === (GameStateTypes.EXPLANATION || GameStateTypes.EXPLANATION)
    const options = nextGameQuestionData.question && nextGameQuestionData.question.options
    let profileImg = '';
    if (GameSponserData.logo) {
      profileImg = { uri: GameSponserData.logo };
    } else {
      profileImg = images.icon;
    }
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.game_on_bg} style={styles.container} resizeMode="cover">
          
        <KeyboardAwareScrollView
          style={{ width: dimensions.SCREEN_WIDTH }}
          contentContainerStyle={styles.scollContainer}
          showsVerticalScrollIndicator={false}
        >
         <View style={styles.topView}>

          <View style={styles.logView}>
          {/* <BackNew action={() => this.props.navigation.goBack()} /> */}
          {/* <Text style={styles.headerText}>Verify Code</Text> */}
          <View style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
          <Image source={ images.userGrey } style={{width: 25, height: 25}} resizeMode="contain" />
          <Text style={{color: 'grey', fontSize: 18, fontFamily: "Roboto-Medium", fontWeight: '800',}}>{userCount}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}> </Text>
          </TouchableOpacity>
          <Image source={ images.skLogo } style={{width: 30, height: 30}} resizeMode="contain" />
          {/* <Image source={images.logo} style={styles.logo} resizeMode="contain" /> */}

        </View>
         {/* <Image source={ images.skLogo } style={{width: 30, height: 30}} resizeMode="contain" /> */}

            <TimerView
              timeRemaining={liveGameTimeRemaining}
              currentGameState={currentGameState}
            />

            <View style={styles.questionView}>
              <Text style={styles.questionText}>{nextGameQuestionData.question && nextGameQuestionData.question.question}</Text>
            </View>

            {
              this.getOptionView(options)
            }
            
            <View style={styles.nextQuestionView}>
              {(currentGameState === GameStateTypes.EXPLANATION || currentGameState === GameStateTypes.ELIMINATE) && <Text style={styles.nextQuestionText}>Next question starts in: <Text style={styles.nextQuestionTimeText}>{nextGameStartsIn} sec</Text></Text>}
            </View>
            
          </View>
          {/* //  {setUpOption(nextGameQuestionData, liveGameTimeRemaining, nextGameStartsIn, currentGameState)} */}

            {(currentGameState === GameStateTypes.EXPLANATION || currentGameState === GameStateTypes.ELIMINATE) ? <ExplanationView
              detailText={gameExplanationData.question && gameExplanationData.question.details ?
                gameExplanationData.question.details : 'No explation found'}
            />
            :
            <SponsoredView 
            GameSponserData={GameSponserData && GameSponserData}
            imageLogo={profileImg}
            />
            }

            <View style={styles.copyRightView}>

            <Text style={[styles.gameText, {marginTop: 20, color: '#2F4F4F', fontSize: 9},]}>Made in India with ♥ from Kairos Team,Vizag,Andhra Pradesh</Text>
            <Text style={[styles.copyRightText, {marginTop: 15, color: '#2F4F4F'}]}>© 2018 SK Trivia Inc. All rights reserved</Text>

            </View>

          </KeyboardAwareScrollView>

        </ImageBackground>
      </View>
    )
  }
}

Container.defaultProps = {
  liveGameTimeRemaining: 0,
  nextGameStartsIn: 0,
  selectedOption: '-',
  currentGameState: GameStateTypes.NONE,
  gameExplanationData: {},
}
