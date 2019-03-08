import Request from './request'
import RequestToken from './requestToken'

import Urls from './urls'
import { timezone, deviceType } from '../utils/utils';

export default class GameService {
  static nextGameDetailsForGuest(deviceId) {
    return RequestToken.post(Urls.game.gameDetailForGuestUserUrl, {
      timezone,
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static nextGameDetailsForLoggedUser(userId, deviceId) {
    return Request.post(Urls.game.gameDetailForLoggedUserUrl, {
      userId,
      timezone,
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static getGameQuestion(gameId, userId, deviceId) {
    return Request.post(Urls.game.getGameQuestionUrl(gameId, userId), {
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static getWinners(gameId, userId, deviceId) {
    return Request.post(Urls.game.winnersUrl(gameId, userId), {
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static liveUserCount(gameId, userId, deviceId) {
    return Request.post(Urls.game.liveUserCountUrl(gameId, userId), {
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static getGameSponsor(gameId, userId, deviceId) {
    return Request.post(Urls.game.getGameSponsorUrl(gameId, userId), {
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static getGameQuestionExplanationDetails(gameId, userId, deviceId) {
    return Request.post(Urls.game.getGameQuestionDetailsExplanationUrl(gameId, userId), {
      deviceType,
      deviceId,
      // TO DO: get clarity & update deviceId
      // deviceId: '',
    })
  }

  static submitUserAnswer(gameId, userId, questionId, answer) {

    console.log('======>>>>> submitUserAnswerURL', Urls.game.submitUserAnswerUrl(gameId, userId, questionId))


    return Request.put(Urls.game.submitUserAnswerUrl(gameId, userId, questionId), {
      answer,
    })
  }
}