
import Request from './request'
import Urls from './urls'
import { deviceType } from '../utils/utils';

export default class ProfileService {
  static getUserProfile(userId) {
    return Request.get(Urls.profile.profileUrl(userId))
  }
  static getCategories(userId, deviceId) {
    return Request.post(Urls.profile.categoriesUrl(userId), {
      deviceType,
      deviceId,
    })
  }

  static getliveUserCount(userId, gameId, deviceId) {
    return Request.post(Urls.profile.liveUserCountUrl(gameId, userId), {
      deviceType,
      deviceId,
    })
  }
  static submitCategories(userId, category, question, answer, deviceId, aOptionValue, bOptionValue, cOptionValue) {

    // const myObjStr = JSON.stringify(myObj);
    console.log('======>>>>> submitCategories', question, answer, aOptionValue, bOptionValue, cOptionValue, category)
    return Request.post(Urls.profile.submitCategoriesUrl(userId), {
      deviceType,
      deviceId,
      category,
      question,
      answer,
      userId,
      options: [{'optionId':'A','optionValue':aOptionValue}, {'optionId':'B','optionValue':bOptionValue}, {'optionId':'C','optionValue':cOptionValue}],
    })
  }
}