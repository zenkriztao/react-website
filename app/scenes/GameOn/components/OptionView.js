import React, { PureComponent } from 'react'
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import images from '../../../assets/images/images'
import { GameStateTypes } from '../../../utils/constants'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles'

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 6,
  },
  container: {
    width: dimensions.SCREEN_WIDTH * 0.76,
    height: 50,
    backgroundColor: 'rgb(247,243,243)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.APP_GREY,
    overflow: 'hidden',
  },
  optionText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
    position: 'absolute',
    left: 18,
    top: 13,
  },
  selectedViewStyle: {
    backgroundColor: COLORS.APP_BACKGROUND,
  },
  selectedTextStyle: {
    color: COLORS.APP_WHITE,
  },
  answerPols: {
    backgroundColor: COLORS.APP_GREEN,
  },
  optionStyles: {
    borderRadius: 35,
    backgroundColor: COLORS.GAME_DETAIL_VIEW_GREY,
  },
  polCountText: {
    color: COLORS.APP_BACKGROUND,
    fontSize: 10,
    textAlign: 'right',
    fontWeight: '400',
    position: 'absolute',
    right: 8,
    top: 17,
  },
})

export default class OptionView extends PureComponent {
  render() {
    const { currentGameState, optionValue, optionId, selectOption, gameExplanationData } = this.props
    let { isSelected } = this.props

    let polAnswer = false

    if (currentGameState === GameStateTypes.LIVE_QUESTION) {
      isSelected = isSelected && currentGameState === GameStateTypes.LIVE_QUESTION
    }
    if (currentGameState === GameStateTypes.EXPLANATION || currentGameState === GameStateTypes.ELIMINATE) {
      polAnswer = isSelected
    }

    let percentage = 0
    if (gameExplanationData &&
      gameExplanationData.question &&
      gameExplanationData.question[`answer${optionId}CountPercentage`]) {

        percentage = gameExplanationData.question[`answer${optionId}CountPercentage`] / 100
    }

    return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.buttonContainer}
      disabled={currentGameState !== GameStateTypes.LIVE_QUESTION}
      onPress={() => selectOption(optionId)}
      key={optionId}
    >
      <View style={[
        styles.container,
        isSelected && currentGameState === GameStateTypes.LIVE_QUESTION ?
          styles.selectedViewStyle : {}]}>

        {/* To Do add views */}
        {(currentGameState === GameStateTypes.EXPLANATION || currentGameState === GameStateTypes.ELIMINATE) &&
          <View style={[styles.optionStyles,
            polAnswer ? styles.answerPols : {},
            percentage ? { flex: percentage } : {},
          ]}
          />
          }
        <Text style={[styles.optionText,
          isSelected && currentGameState === GameStateTypes.LIVE_QUESTION ?
          styles.selectedTextStyle : {}]}>{optionValue}</Text>
        
        {(currentGameState === GameStateTypes.EXPLANATION  || currentGameState === GameStateTypes.ELIMINATE) &&
          <Text style={styles.polCountText}>{
            gameExplanationData.question &&
            gameExplanationData.question[`answer${optionId}Count`] ?
              gameExplanationData.question[`answer${optionId}Count`] : '0'
          }</Text>
        }
        
      </View>
    
    </TouchableOpacity>)
  }
}

OptionView.defaultProps = {
  isSelected: false,
  isdisabled: false,
  currentGameState: GameStateTypes.TIMES_UP,
  optionValue: '',
  optionId: '-',
  selectOption: () => {},
  gameExplanationData: {},
}
