import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles'

const styles = StyleSheet.create({
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
})

const ExplanationView = (props) => (<View style={styles.explainationView}>
  <Text style={styles.explainationHeaderText}>Explaination:</Text>
  <Text style={styles.explainationText}>{props.detailText}</Text>
</View>)

ExplanationView.defaultProps = {
  detailText: '-'
}

export default ExplanationView
