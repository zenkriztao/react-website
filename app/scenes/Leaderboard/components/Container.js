import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, Alert, Platform } from 'react-native'
import images from '../../../assets/images/images'
import BackButton from '../../../components/BackButton'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles'
import { LEADERBOARD_TYPE } from '../../../utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  navBar: {
    width: dimensions.SCREEN_WIDTH,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: "Roboto-Medium",
    textAlign: 'center',
    color: 'black',
  },
  backView: {
    marginHorizontal: 10,
  },

  selectionView: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  buttonView: {
    width: dimensions.SCREEN_WIDTH * 0.4,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.APP_FADE_BLUE,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },

  leaderHeaderContainer: {
    alignItems: 'center',
    borderBottomColor: COLORS.APP_GREY,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  leaderHeader: {
    width: dimensions.SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  userHeaderView: {
    width: dimensions.SCREEN_WIDTH * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeaderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userName: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 12,
    fontFamily: "Roboto-Medium",
  },
  amountView: {
    padding: 10,
    backgroundColor: COLORS.APP_BUTTON_GREY,
    borderRadius: 20,
    marginTop: 4,
    width: 100,
  },
  amountText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: "Roboto-Medium",
  },
  positionView: {
    position: 'absolute',
    left: 6,
    top: 0,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_BACKGROUND,
    borderRadius: 15,
  },
  positionText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },

  myInformationView: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.APP_GREY,
  },
  myName: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: "Roboto-Medium",
  },

  otherUserRow: {
    width: dimensions.SCREEN_WIDTH - 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: COLORS.APP_GREY,
    borderBottomWidth: 1,
  },
  otherUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 10,
  },
  otherUserPositionText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: "Roboto-Medium",
  },
  otherUserName: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: 10,
    fontFamily: "Roboto-Medium",
  },
})

const positionBackgroundColors = {
  1: COLORS.APP_YELLOW,
  2: COLORS.APP_BACKGROUND,
  3: COLORS.APP_GREEN,
}
const positionTextColors = {
  1: 'black',
  2: 'white',
  3: 'black',
}

const UserLeaderboard = (props) => (
  <View style={styles.userHeaderView}>
    <Image style={[styles.userHeaderImage, { transform: [{ scale: props.position === 1 ? 1.25 : 1 }] }]}
      source={props.image} resizeMode="contain"/>
    <Text numberOfLines={1} style={styles.userName}>{props.name}</Text>
    <View style={styles.amountView}>
      <Text style={styles.amountText}>${props.amount}</Text>
    </View>
    <View style={[styles.positionView,  {
      top: props.position !== 1 ? 8 : 0,
      left: props.position === 1 ? 3 : 6,
      backgroundColor: positionBackgroundColors[props.position]
      }]}>
      <Text style={[styles.positionText, { color: positionTextColors[props.position] }]}>{props.position}</Text>
    </View>
  </View>
)

UserLeaderboard.defaultProps = {
  name: '-',
  isFirst: false,
  image: images.icon,
  amount: '0',
}

const LeaderboardHeader = ({ topUsers, loginUserProfile, loogInUserType}) => {

  let profileImg = '';
  if (loginUserProfile.avatar) {
    profileImg = { uri: loginUserProfile.avatar };
  } else {
    profileImg = images.icon;
  }

  let first = null
  let second = null
  let third = null
  switch (topUsers.length) {
    case 1:
      first = topUsers[0]
      break
    case 2:
      first = topUsers[0]
      second = topUsers[1]
      break
    case 3:
      first = topUsers[0]
      second = topUsers[1]
      third = topUsers[2]
      break
    default:
      break
  }
  return (
    <View style={styles.leaderHeaderContainer}>
      <View style={styles.leaderHeader}>
        {second && <UserLeaderboard position={second.rank} name={second.handle} image={{ uri: second.avatar }} amount={second.amount}/>}
        {first && <UserLeaderboard position={first.rank} name={first.handle} image={{ uri: first.avatar }} amount={first.amount}/>}
        {third && <UserLeaderboard position={third.rank} name={third.handle} image={{ uri: third.avatar }} amount={third.amount}/>}
      </View>
      {loogInUserType !== 'guest' && 
      <View style={styles.myInformationView}>
        <Image style={styles.userHeaderImage} source={profileImg} />
        <Text style={styles.myName}>{loginUserProfile && loginUserProfile.handle}</Text>
        <View style={[styles.amountView, { marginTop: 0 }]}>
          <Text style={styles.amountText}>{loginUserProfile && loginUserProfile.amount}</Text>
        </View>
      </View>
      }
    </View>
  )
}

const OtherUserBoard = ({ rank, name, image, amount }) => (
  <View style={styles.otherUserRow}>
    <Text style={styles.otherUserPositionText}>{rank}</Text>
    <Image style={styles.otherUserImage} source={image} resizeMode="contain" />
    <Text style={styles.otherUserName}>{name}</Text>
    <View style={[styles.amountView, { marginTop: 0 }]}>
      <Text style={styles.amountText}>${amount}</Text>
    </View>
  </View>
)

OtherUserBoard.defaultProps = {
  rank: '-',
  name: '-',
  image: images.icon,
  amount: '0',
}

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { leaderBoardType, leaderBoard, selectLeaderboardType, loginUserProfile, loogInUserType } = this.props
    let remainingList = []
    let topUsers = []
    if (leaderBoard.length >= 3) {
      topUsers = leaderBoard.slice(0, 3)
      remainingList = leaderBoard.slice(3)
    } else {
      topUsers = leaderBoard
    }

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.backView}>
          <BackButton action={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Leaderboard</Text>
          </View>
          <View style={[styles.backView, { opacity: 0 }]}>
            <BackButton />
          </View>
        </View>

        <View style={styles.selectionView}>
            <TouchableOpacity onPress={() => selectLeaderboardType(LEADERBOARD_TYPE.THIS_WEEK)}>
              <View style={[
                styles.buttonView,
                { backgroundColor: leaderBoardType === LEADERBOARD_TYPE.THIS_WEEK ? COLORS.APP_RED : COLORS.APP_BUTTON_GREY }]}>
                <Text style={[styles.buttonText, { color: leaderBoardType === LEADERBOARD_TYPE.THIS_WEEK ? COLORS.APP_WHITE : 'grey' }]}>This week</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectLeaderboardType(LEADERBOARD_TYPE.ALL_TIME)}>
              <View style={[
                styles.buttonView,
                { backgroundColor: leaderBoardType === LEADERBOARD_TYPE.ALL_TIME ? COLORS.APP_RED : COLORS.APP_BUTTON_GREY }]}>
                <Text style={[styles.buttonText, { color: leaderBoardType === LEADERBOARD_TYPE.ALL_TIME ? COLORS.APP_WHITE : 'grey' }]}>All time</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <FlatList
            contentContainerStyle={{ alignItems: 'center' }}
            data={remainingList}
            extraData={leaderBoard}
            keyExtractor={(item, index) => `item-${index}`}
            ListHeaderComponent={() => <LeaderboardHeader topUsers={topUsers} loginUserProfile={loginUserProfile} loogInUserType={loogInUserType}/>}
            renderItem={({ item, index }) => <OtherUserBoard
            rank={item.rank}
            name={item.handle}
            image={{ uri: item.avatar }}
            amount={item.amount}
            />}
          />
      </View>
    )
  }
}
