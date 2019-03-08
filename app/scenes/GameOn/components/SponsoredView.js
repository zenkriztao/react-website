import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { COLORS, defaultStyle } from '../../../utils/styles'

const styles = StyleSheet.create({
  sponsoredView: {
    width: dimensions.SCREEN_WIDTH * 0.92,
    padding: 6,
    marginVertical: 15,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.APP_RED,
    flexDirection: 'row',
  },
  sponsoredByText: {
    color: COLORS.APP_BLACK,
    fontSize: 12,
    textAlign: 'left',
    fontWeight: '400',
  },
  sponsorImage: {
    width: 80,
    height: 120,
    // tintColor: COLORS.APP_RED,
  },

  detailView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
  },
  detailViewHeader: {
    color: COLORS.APP_RED,
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    marginBottom: 8,
  },
  detailViewText: {
    color: COLORS.APP_BLACK,
    fontSize: 13,
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: 22,
  },

  sponsorActionView: {
    alignSelf: 'stretch',
    ...defaultStyle,
    marginTop: 10,
  },
  sponsorButtonView: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.APP_RED,
    borderRadius: 12,
  },
  sponsorButtonText: {
    color: COLORS.APP_WHITE,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
})

const SponsoredView = (props) => (<View style={styles.sponsoredView}>
  <View>
    <Text style={styles.sponsoredByText}>Sponsored by: {props.GameSponserData &&  props.GameSponserData.orgName}</Text>
    <Image style={styles.sponsorImage} source={props.imageLogo} resizeMode="contain" />
  </View>
  <View style={styles.detailView}>
    <Text style={styles.detailViewHeader}>{props.GameSponserData &&  props.GameSponserData.title}</Text>
    <Text style={styles.detailViewText}>{props.GameSponserData &&  props.GameSponserData.text}</Text>
    <View style={styles.sponsorActionView}>
      <TouchableOpacity onPress={() => Linking.openURL(props.GameSponserData.ctaActionURL)}>
        <View style={styles.sponsorButtonView}>
          <Text style={styles.sponsorButtonText}>{props.GameSponserData &&  props.GameSponserData.ctaButtonTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
</View>)

SponsoredView.defaultProps = {
  clickOnSponsor: () => {},
  GameSponserData: {},
  imageLogo: '',

}

export default SponsoredView
