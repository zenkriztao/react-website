import React, { PureComponent } from 'react'
import { SafeAreaView, Alert, Keyboard, StatusBar, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-toast-native';
import User from '../../store/User'
import { GameStateTypes } from '../../utils/constants'
import Container from './components/Container'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/styles'
import GameService from '../../api/game';

const style={
  backgroundColor: "#FF0000",
  width: 240,
  height: Platform.OS === ("ios") ? 50 : 100,
  color: "#ffffff",
  fontSize: 30,
  // lineHeight: 2,
  // lines: 4,
  borderRadius: 15,
  fontWeight: "700",
  // yOffset: 40
  // width: 300,
  // height: Platform.OS === ("ios") ? 50 : 100,
  // lineHeight: 2,
  // lines: 4,
  // borderRadius: 15,
  // fontWeight: "bold",
  // yOffset: 40
};



export default class GameOnScene extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      currentGameState: GameStateTypes.NONE,
      liveGameTimeRemaining: 0,
      nextGameStartsIn: 0,
      nextGameQuestionData: {},
      gameExplanationData: {},
      GameSponserData: {},
      selectedOption: '',
      userCount: '',
    }
    StatusBar.setHidden(true, 'slide')
    this.liveGameTimer = null
    this.explainationTimer = null
  }

  componentDidMount() {

    //API Call
    const { gameId } = this.props.navigation.state.params
    this.getNextGameQuestion(gameId)
    this.getGameSponser(gameId)
    this.getLiveserData(gameId)

// According to need afeter call API
  // this.getGameExplanation(gameId)
  }

  componentWillUnmount() {
    if (this.liveGameTimer) clearInterval(this.liveGameTimer)
    if (this.explainationTimer) clearInterval(this.explainationTimer)
  }


  getNextGameQuestion(gameId) {
    this.setState({ isLoading: true, selectedOption: '' }, () => {
      GameService.getGameQuestion(gameId, User.userId, User.getToken()).then((response) => {
        console.log('======>>>>> getNextGameQuestion', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
            if(response.data.data.status === 'live' && response.data.data.userStatus === 'live') {
              this.setState({ nextGameQuestionData: response.data.data }, () => {
                this.startLiveQuestionTimer()
              })
            }  else if (response.data.data.status === 'calc-winnings' || response.data.data.status === 'complete' || response.data.data.status === 'calc-winners' || response.data.data.status === 'calc-winners-done'){
              this.props.navigation.navigate('Winners', {gameId})
              return
            }  else if (response.data.data.userStatus === 'eliminated'){
              this.setState({nextGameQuestionData: response.data.data }, () => {
                this.startLiveQuestionTimer()
              })
            } else if(response.data.data.userStatus === 'view only') {
              this.setState({ nextGameQuestionData: response.data.data }, () => {
                this.startLiveQuestionTimer()
              })}
        }
        if (response.data && response.data.status === 'error' && response.data.message) {
          // Alert.alert('Message', response.data.message)
          this.getNextGameQuestion(gameId)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  getGameSponser(gameId) {
    this.setState({ isLoading: true}, () => {
      GameService.getGameSponsor(gameId, User.userId, User.getToken()).then((response) => {
        console.log('======>>>>> getGameSponsor', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
            this.setState({ GameSponserData: response.data.data })
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

  selectOption = (option) => {
    console.log('!!!!!!!!! ')
    // let questionId = this.state.nextGameQuestionData.

    if (this.state.nextGameQuestionData.userStatus === 'live') {

      // if (this.state.selectedOption !== '-' && this.state.selectedOption !== '') {
      //   return;
      // }

      this.setState({ selectedOption: option })
      this.submitUserAnswer()
    } else {
      this.setState({ selectedOption: '-' })
    }
    // if (this.liveGameTimer) clearInterval(this.liveGameTimer)


    // if (this.state.nextGameQuestionData.userStatus === 'eliminated' || this.state.nextGameQuestionData.userStatus === 'view only') {
    //  // Toast.show('Eliminated',Toast.SHORT,Toast.CENTER,style); 
    //  this.setState({ selectedOption: '-' })

    // } else {
    //   this.setState({ selectedOption: option })
    // }

  }

  submitUserAnswer() {
    const { gameId } = this.props.navigation.state.params
    let questionId = this.state.nextGameQuestionData.question.questionId
      if (this.state.selectedOption === '-'){
        this.setState({ currentGameState: GameStateTypes.TIMES_UP })
      }
      console.log('OPTION###################', this.state.selectedOption)
    // Toast.show('Answer Submit'); 

    this.setState({ isLoading: true}, () => {
      GameService.submitUserAnswer(gameId, User.userId, questionId, this.state.selectedOption).then((response) => {
        console.log('======>>>>> submitUserAnswer', response)

        if (response.data && response.data.status === 'success') {
       //  this.getGameExplanation()
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          // Alert.alert('Message', response.data.message)
       //  this.getGameExplanation()

        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  getGameExplanation() {
    const { gameId } = this.props.navigation.state.params
    this.setState({ isLoading: true}, () => {
      GameService.getGameQuestionExplanationDetails(gameId, User.userId, User.getToken()).then((response) => {
        console.log('======>>>>> getGameExplanation', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {
            let obj  = ''
            if(response.data.data.userStatus === 'eliminated') {
              obj = GameStateTypes.ELIMINATE 
            }
            if(response.data.data.userStatus === 'live') {
              obj = GameStateTypes.EXPLANATION 
            }
            if(response.data.data.userStatus === 'calc-winners') {
              obj = GameStateTypes.EXPLANATION 
            }
           
            this.setState({
              gameExplanationData: response.data.data,
              currentGameState: obj,
              selectedOption: response.data.data.question.answer,
              nextGameStartsIn: response.data.data.expiryTimeInSecs,
            }, () => {
              this.showExplaination()
            })
          return
        }
        if (response.data && response.data.status === 'error' && response.data.message) {
          // Alert.alert('Message', response.data.message)
          console.log('======>>>>>Failed getGameExplanation', response)

          this.getGameExplanation()
        }
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  startLiveQuestionTimer() {
    if (this.state.nextGameQuestionData.userStatus === 'eliminated' || this.state.nextGameQuestionData.userStatus === 'view only'){
    this.setState({
      currentGameState: GameStateTypes.LIVE_QUESTION,
      liveGameTimeRemaining: this.state.nextGameQuestionData.expiryTimeInSecs
  }, () => {
    this.liveGameTimer = setInterval(() => {
      console.log("TIMERFINIDHED++++++")

      if (this.state.liveGameTimeRemaining === 0) {
        console.log("TIMERFINIDHED++++++0000000")

          this.setState({ selectedOption: '-' })
          this.submitUserAnswer()
         this.getGameExplanation()
        // Clear live question time: TimesUp
        if (this.liveGameTimer) clearInterval(this.liveGameTimer)
        return
      }
      this.setState({ liveGameTimeRemaining: this.state.liveGameTimeRemaining - 1 })
    }, 1000);
  })
  } else {
      this.setState({
        currentGameState: GameStateTypes.LIVE_QUESTION,
        liveGameTimeRemaining: this.state.nextGameQuestionData.expiryTimeInSecs
    }, () => {

      this.liveGameTimer = setInterval(() => {
        console.log("TIMERFINIDHED++++++")

      if (this.state.liveGameTimeRemaining === 0) {
        console.log("TIMERFINIDHED++++++000000")
          if (this.state.selectedOption === '') {
            this.setState({ selectedOption: '-' })
            this.submitUserAnswer()
        } 
        this.getGameExplanation()
          //  this.submitUserAnswer()
          // Clear live question time: TimesUp
          if (this.liveGameTimer) clearInterval(this.liveGameTimer)
          return
        }
        this.setState({ liveGameTimeRemaining: this.state.liveGameTimeRemaining - 1 })
      }, 1000);
    })
  }
    
  }
  // startLiveQuestionTimer() {
  //   if (this.state.nextGameQuestionData.userStatus === 'eliminated' || this.state.nextGameQuestionData.userStatus === 'view only'){
  //     console.log("USERSTATUS====>GameStateTypes.ELIMINATE")
  //   this.setState({
  //     currentGameState: GameStateTypes.LIVE_QUESTION,
  //     liveGameTimeRemaining: this.state.nextGameQuestionData.expiryTimeInSecs
  // }, () => {
  //   this.liveGameTimer = setInterval(() => {
  //     if (this.state.liveGameTimeRemaining === 0) {
  //         this.getGameExplanation()
  //       // Clear live question time: TimesUp
  //       if (this.liveGameTimer) clearInterval(this.liveGameTimer)
  //       return
  //     }
  //     this.setState({ liveGameTimeRemaining: this.state.liveGameTimeRemaining - 1 })
  //   }, 1000);
  // })
  // } else {
  //     this.setState({
  //       currentGameState: GameStateTypes.LIVE_QUESTION,
  //       liveGameTimeRemaining: this.state.nextGameQuestionData.expiryTimeInSecs
  //   }, () => {

  //     this.liveGameTimer = setInterval(() => {
  //       if (this.state.liveGameTimeRemaining === 0) {
  //         console.log("USERSTATUS====>GameStateTypes.LIVE")
  //           this.submitUserAnswer()
  //         // Clear live question time: TimesUp
  //         if (this.liveGameTimer) clearInterval(this.liveGameTimer)
  //         return
  //       }
  //       this.setState({ liveGameTimeRemaining: this.state.liveGameTimeRemaining - 1 })
  //     }, 1000);
  //   })
  // }
    
  // }

  showExplaination() {
    this.explainationTimer = setInterval(() => {
      if (this.state.nextGameStartsIn === 0) {
        // Apply checks for elimination
        console.log("GAMEID:::", this.state.gameExplanationData && this.state.gameExplanationData.gameId )
        const  gameId  = this.state.gameExplanationData.gameId
        
        console.log("GAMEID:::====>", gameId)

        if (this.state.gameExplanationData.status === 'complete' || this.state.gameExplanationData.userStatus === 'calc-winners' || this.state.gameExplanationData.status === 'calc-winnings'){
          if (this.explainationTimer) clearInterval(this.explainationTimer)
          this.props.navigation.navigate('Winners', {gameId})
          return
        }
        
        this.setState({
          liveGameTimeRemaining: 0,
          nextGameStartsIn: 0,
          currentGameState: GameStateTypes.NONE,
          gameExplanationData: {},
        })
        console.log('TIMEENDING++++++++++', gameId)
        this.getNextGameQuestion(gameId)
        if (this.explainationTimer) clearInterval(this.explainationTimer)
        return
      }
      this.setState({ nextGameStartsIn: this.state.nextGameStartsIn - 1 })
    }, 1000)
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
    const {
      isLoading,
      currentGameState,
      liveGameTimeRemaining,
      nextGameStartsIn,
      nextGameQuestionData,
      gameExplanationData,
      GameSponserData,
      selectedOption,
      userCount,
    } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.GAME_DETAIL_VIEW_BACKGROUND }}>
        <Container
          navigation={this.props.navigation}
          currentGameState={currentGameState}
          liveGameTimeRemaining={liveGameTimeRemaining}
          nextGameStartsIn={nextGameStartsIn}
          nextGameQuestionData={nextGameQuestionData}
          gameExplanationData={gameExplanationData}
          GameSponserData={GameSponserData}
          selectOption={this.selectOption}
          selectedOption={selectedOption}
          userCount={userCount}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    )
  }
}
