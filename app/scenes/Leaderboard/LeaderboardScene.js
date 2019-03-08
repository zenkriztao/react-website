import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import Container from './components/Container';
import LeaderBoardService from '../../api/leaderBoard';
import Loader from '../../components/Loader'
import { LEADERBOARD_TYPE } from '../../utils/constants';
import { COLORS } from '../../utils/styles';
import User from '../../store/User'


export default class LeaderboardScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allTimeLeaderboard: [],
      thisWeekLeaderBoard: [],
      leaderBoardType: LEADERBOARD_TYPE.ALL_TIME,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getLeaderBoardThisWeek()
    this.getLeaderBoardAllTime()
  }

  getLeaderBoardThisWeek() {
    this.setState({ isLoading: true}, () => {
      LeaderBoardService.LeaderBoardThisWeek(User.getToken()).then((response) => {
        console.log('======>>>>> LEADERBOARDRESPONSE', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data &&
          response.data.data.winners) {
          this.setState({ thisWeekLeaderBoard: response.data.data.winners })
          return
        }
        
        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }


  getLeaderBoardAllTime() {
    this.setState({ isLoading: true}, () => {
      LeaderBoardService.LeaderBoardAllTime(User.getToken()).then((response) => {
        console.log('======>>>>> LEADERBOARDALL', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data &&
          response.data.data.winners) {
          this.setState({ allTimeLeaderboard: response.data.data.winners })
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  selectLeaderboardType = (type) => {
    if (type === this.state.leaderBoardType) return
    this.setState({ leaderBoardType: type })
  }

  render() {
    const { isLoading, leaderBoardType, allTimeLeaderboard, thisWeekLeaderBoard } = this.state
    const { loginUserProfile, loogInUserType } = this.props.navigation.state.params

    let leaderBoard = []
    if (leaderBoardType === LEADERBOARD_TYPE.ALL_TIME) {
      leaderBoard = allTimeLeaderboard
    } else {
      leaderBoard = thisWeekLeaderBoard
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
        <Container
          leaderBoardType={leaderBoardType}
          navigation={this.props.navigation}
          loginUserProfile={loginUserProfile}
          leaderBoard={leaderBoard}
          loogInUserType={loogInUserType}
          selectLeaderboardType={this.selectLeaderboardType}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    );
  }
}
