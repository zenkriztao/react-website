import React, { PureComponent } from 'react'
import { SafeAreaView, Alert, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import User from '../../store/User'
import GameService from '../../api/game';
import ProfileService from '../../api/profile';
import Container from './components/Container'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles';
import { getFormattedDate, getDateInSeconds } from '../../utils/utils';

let timezoneAbbr = ''

export default class HomeScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      winners: [],
      userCount: '',
    }
  }

  componentDidMount() {
    const { gameId } = this.props.navigation.state.params
    this.getWinnesData(gameId);
    this.getLiveserData(gameId);
    // var date = new Date();
    // timezoneAbbr = String(String(date).split("(")[1]).split(")")[0];
    // const { loogInUserType } = this.props.navigation.state.params
    // if (loogInUserType === 'guest') {
    //   this.getGameDetailsForGuest()
    // } else {
    //   this.getGameDetailsForLoggedUser()
    //   this.getLoginUserProfile()
    // }
  }

  getWinnesData(gameId) {
    this.setState({ isLoading: true, selectedOption: '-' }, () => {
      GameService.getWinners(gameId, User.userId, User.getToken()).then((response) => {
        console.log('************** getNextGameQuestion', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
          this.setState({ winners: response.data.data.winners });
          return
        }
        if (response.data && response.data.status === 'error' && response.data.message) {
         // Alert.alert('Message', response.data.message)
         const { gameId } = this.props.navigation.state.params
         this.setState({ isLoading: true })
          this.getWinnesData(gameId);
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  getLiveserData(gameId) {
    this.setState({ isLoading: true}, () => {
      GameService.liveUserCount(gameId, User.userId, User.getToken()).then((response) => {
        console.log('************** getLiveserData', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
         // this.setState({ winners: response.data.data.winners });
         this.setState({userCount: response.data.data.liveUserCount})
          return
        }
        if (response.data && response.data.status === 'error' && response.data.message) {
         // Alert.alert('Message', response.data.message)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  render() {
    const { isLoading, winners, userCount } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_BACKGROUND }}>
        <Container
          navigation={this.props.navigation}
          winners={winners}
          userCount={userCount}
          isLoading={isLoading}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    )
  }
}
