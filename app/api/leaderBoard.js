import Request from './request'
import RequestToken from './requestToken'

import Urls from './urls'
import { timeZoneName, deviceType } from '../utils/utils';

export default class LeaderBoardService {
  static LeaderBoardThisWeek(deviceId) {
    return RequestToken.post(Urls.leaderBoard.leaderBoardThisWeekUrl, {
        deviceType,
        deviceId,
      })
  }

  static LeaderBoardAllTime(deviceId) {
    return RequestToken.post(Urls.leaderBoard.leaderBoardAllTimeUrl, {
        deviceType,
        deviceId,
      })
  }
}