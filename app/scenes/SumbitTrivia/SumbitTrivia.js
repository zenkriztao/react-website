import React, { PureComponent } from 'react'
import { SafeAreaView, Alert } from 'react-native'
import Container from './components/Container'
import Loader from '../../components/Loader'
import ProfileService from '../../api/profile';
import { COLORS } from '../../utils/styles'
import User from '../../store/User'

export default class SumbitTrivia extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      loginUserProfile: {},
      liveUserCount: {},
      optionsList: [],
    }
  }

  componentDidMount() {
    const { gameId } = this.props.navigation.state.params

    console.log('gmaiID---------->', gameId)


      this.getCategories()
      this.getCoins()
  }

  getCategories() {
    this.setState({ isLoading: true}, () => {
      ProfileService.getCategories(User.userId, User.getToken()).then((response) => {
        console.log('======>>>>> getCategories', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {  
          this.setState({ optionsList: response.data.data })
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }

  
  getCoins() {

    const { gameId } = this.props.navigation.state.params

    this.setState({ isLoading: true}, () => {
      ProfileService.getliveUserCount(User.userId, gameId, User.getToken()).then((response) => {
        console.log('======>>>>> getliveUserCount', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.data) {  
          this.setState({ liveUserCount: response.data.data })
          return
        }

        if (response.data && response.data.status === 'error' && response.data.message) {
          Alert.alert('Message', response.data.message)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }
  performSubmit({question, answer, aOptionValue, bOptionValue, cOptionValue, options}) {


    // console.log('======>>>>> submitCategories', question, answer, aOptionValue, bOptionValue, cOptionValue, options)
// return
    this.setState({ isLoading: true}, () => {
      ProfileService.submitCategories(User.userId, options, question, answer, User.getToken(), aOptionValue, bOptionValue, cOptionValue).then((response) => {
        console.log('======>>>>> submitCategories', response)
        if (response.data &&
          response.data.status === 'success' &&
          response.data.message) {  
          Alert.alert('Message', response.data.message)

          return
        }

        if (response.data && response.data.status === 'error') {
          Alert.alert('Message', response.data.message)
          return
        }
     
      }).catch((error) => {
        console.log('!!!!!!!!! ', error)
      }).finally(() => this.setState({ isLoading: false }))
    })
  }
  
  
  render() {
    const { isLoading } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.APP_WHITE }}>
        <Container
          navigation={this.props.navigation}
          loginUserProfile={this.state.loginUserProfile}
          optionsList={this.state.optionsList}
          liveUserCount={this.state.liveUserCount}
          performSubmit={userObject => this.performSubmit(userObject)}

        />
        {isLoading && <Loader />}
      </SafeAreaView>
    )
  }
}
