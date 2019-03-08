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
      guestUserData: {},
      loginUserData: {},
      loginUserProfile: {},
      datetime: '-',
      isShowDatetime: true,
      liveGameExist: false,
      dateinsecond: 180,
    }
  }

  componentDidMount() {
    var date = new Date();
    timezoneAbbr = String(String(date).split("(")[1]).split(")")[0];
    const { loogInUserType } = this.props.navigation.state.params
    if (loogInUserType === 'guest') {
      this.getGameDetailsForGuest()
    } else {
      this.getGameDetailsForLoggedUser()
      this.getLoginUserProfile()
    }
    this.startTimerForGameDetails();
  }

  componentWillMount() {
    this.stopTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getGameDetailsForGuest() {
    this.setState({ isLoading: true}, () => {
      GameService.nextGameDetailsForGuest(User.getToken()).then((response) => {
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
          this.setState({ guestUserData: response.data.data })
          if (response.data.data && response.data.data) {
            this.startTimer(response.data.data)
          }
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
        //  Alert.alert('Message', response.data.message)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  getGameDetailsForLoggedUser() {
    this.setState({ isLoading: true}, () => {
      this.callGameDetailsAPIAtServer();
    })
  }

  callGameDetailsAPIAtServer() {
      GameService.nextGameDetailsForLoggedUser(User.userId, User.getToken()).then((response) => {
        console.log('======>>>>> GameDetailsForLoggedUser', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
          this.setState({ loginUserData: response.data.data, liveGameExist: response.data.liveGameExist })
          if (response.data.data && response.data.data) {
            this.startTimer(response.data.data)
          }
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
         // Alert.alert('Message', response.data.message)
          return
        }
    
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    }

  getLoginUserProfile() {
    this.setState({ isLoading: true}, () => {
      ProfileService.getUserProfile(User.userId).then((response) => {
        console.log('======>>>>> USERPROFILE', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
          this.setState({ loginUserProfile: response.data.data })
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

  startTimerForGameDetails = () => {
    this.interval = setInterval(
      () => this.callUserDetailAPI(),
      1000*60
    );
  }

  callUserDetailAPI() {
    // this.getGameDetailsForGuest();
    this.callGameDetailsAPIAtServer();
  }

  startTimer = (userServerData) => {
    this.secondinterval = setInterval(
      () => this.refreshPlayGameTime(userServerData),
      1000
    );
  }

  stopTimer = () => {
    clearInterval(this.interval);
    clearInterval(this.secondinterval);
  }

  refreshPlayGameTime = (userServerData) => {
    // const datetime = '2019-01-12T14:32:38.478Z';
    const datetime = userServerData.liveAt;
    const datetimeFormat = getFormattedDate(datetime);
    const datetimeString = `${datetimeFormat} ${timezoneAbbr}`
    const dateinsecond = getDateInSeconds(datetime);

    // const liveAtUnixTime = userServerData.liveAtUnixTime;
    // console.log('********** dateinsecond', dateinsecond);
    let isShowDateLabel = true;
    if (dateinsecond <= 180) {
      isShowDateLabel = false;
    } else {
      isShowDateLabel = true;
    }
    this.setState({ isShowDatetime: isShowDateLabel, datetime: datetimeString, dateinsecond })
  }

  render() {
    const { isLoading, datetime, isShowDatetime, liveGameExist, dateinsecond } = this.state
    const { loogInUserType } = this.props.navigation.state.params
    let userData = {}
    if (loogInUserType === 'guest') {
      userData = this.state.guestUserData
    } else {
      userData = this.state.loginUserData
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_BACKGROUND }}>
        <Container
          navigation={this.props.navigation}
          userData={userData}
          liveGameExist={liveGameExist}
          datetime={datetime}
          isShowDatetime={isShowDatetime}
          loogInUserType={loogInUserType}
          dateinsecond={dateinsecond}
          loginUserProfile={this.state.loginUserProfile}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    )
  }
}
