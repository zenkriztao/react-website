import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native'
import dimensions from '../utils/dimensions'
import { COLORS } from '../utils/styles';

const styles = StyleSheet.create({
  screenContainer: {
    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT,
    backgroundColor: '#00000050',
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 10,
  },
  touchableContianer: {
    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: dimensions.SCREEN_WIDTH * 0.80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2F2',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    marginHorizontal: 5,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: COLORS.APP_BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  categoryInfoView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  selectCategoryText: {
    paddingLeft: 5,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 3,
    backgroundColor: 'transparent',
  },
  closeView: {
    position: 'absolute',
    right: 4,
    top: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  listContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  listStyle: {
    alignSelf: 'stretch',
    maxHeight: dimensions.SCREEN_HEIGHT * 0.60,
  },
  rowStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
    borderBottomLeftRadius: 20,
    backgroundColor: 'transparent',
  },
  rowText: {
    flex: 1,
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    marginRight: 5,
    marginVertical: 5,
    paddingLeft: 3,
  },
})

class CustomDropDown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // Add Android back handler
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress())
  }

  componentWillUnmount() {
    // Remove Android back handler
    this.backHandler.remove()
  }

  handleBackPress() {
    this.props.close()
    return true
  }

  render() {
    const { props } = this
    return (
      <View style={styles.screenContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchableContianer}
          onPress={() => props.close()}
        >
          <View style={[styles.mainContainer, props.dropdownContainerStyle]}>
            <View style={styles.topView}>
              <View style={styles.categoryInfoView}>
                <Text
                  style={styles.selectCategoryText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {props.title}
                </Text>
              </View>
              <View style={styles.closeView}>
                <TouchableOpacity
                  onPress={() => props.close()}
                  style={styles.closeTouchable}
                >
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.listStyle}
                data={props.listData}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      props.onSelectOption(item, index)
                      props.close()
                    }}
                  >
                    <View style={styles.rowStyle}>
                      <Text
                        style={styles.rowText}
                        numberOfLines={3}
                        lineBreakMode="tail"
                      >{item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

CustomDropDown.propTypes = {
  title: PropTypes.string,
  listData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectOption: PropTypes.func,
  close: PropTypes.func,
  dropdownContainerStyle: PropTypes.any,
}

CustomDropDown.defaultProps = {
  title: 'Select an option',
  listData: [],
  onSelectOption: () => {},
  close: () => {},
  dropdownContainerStyle: null,
}

export default CustomDropDown
