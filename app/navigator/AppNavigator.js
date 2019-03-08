import { StackNavigator } from 'react-navigation'
import dimensions from '../utils/dimensions'
import Splash from '../scenes/Splash/SplashScene'
// Auth
import Login from '../scenes/Login/LoginScene'
import VerifyOTP from '../scenes/VerifyOTP/VerifyOTPScene'
import SetUserName from '../scenes/SetUserName/SetUserNameScene'
import NotificationVerification from '../scenes/NotificationVerification/NotificationVerification'

// Home
import Home from  '../scenes/Home/HomeScene'

//Cash Out
import CashOut from '../scenes/CashOut/CashOut'
import About from '../scenes/About/About'

// Leaderboard
import Leaderboard from '../scenes/Leaderboard/LeaderboardScene'

// Settings
import Settings from '../scenes/Settings/SettingsScene'

// Game On
import GameOn from '../scenes/GameOn/GameOnScene'

// HowToPlay
import HowTOPlay from '../scenes/HowTOPlay/HowTOPlay'

// Submit Trivia
import SumbitTrivia from '../scenes/SumbitTrivia/SumbitTrivia'

import Winners from  '../scenes/Winners/WinnersScene'

const RootNavigator = StackNavigator({
  Splash: {
    screen: Splash,
    key: 'Splash',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Login,
    key: 'Login',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  VerifyOTP: {
    screen: VerifyOTP,
    key: 'VerifyOTP',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SetUserName: {
    screen: SetUserName,
    key: 'SetUserName',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  NotificationVerification: {
    screen: NotificationVerification,
    key: 'NotificationVerification',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

  Home: {
    screen: Home,
    key: 'Home',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

  CashOut: {
    screen: CashOut,
    key: 'CashOut',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  About: {
    screen: About,
    key: 'About',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Leaderboard: {
    screen: Leaderboard,
    key: 'Leaderboard',
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Settings: {
    screen: Settings,
    key: 'Settings',
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  
  GameOn: {
    screen: GameOn,
    key: 'GameOn',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  HowTOPlay: {
    screen: HowTOPlay,
    key: 'HowTOPlay',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SumbitTrivia: {
    screen: SumbitTrivia,
    key: 'SumbitTrivia',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Winners: {
    screen: Winners,
    key: 'Winners',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
})

export default RootNavigator
