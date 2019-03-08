import Request from './request'
import Urls from './urls'
import RequestToken from './requestToken'
import RequestOauth from './requestOauth'

export default class AuthService {
  static signIn(phone, countryCode, deviceType, timezone) {
    return RequestToken.post(Urls.auth.signInUrl, {
      phone,
      countrycode: countryCode,
      deviceType,
      timezone,
    })
  }
  
  static verifyCode(userId, verificationCode) {
    return Request.post(Urls.auth.verifyCodeUrl, {
      userId,
      verification_code: verificationCode
    })
  }

  static checkUserName(userName) {
    return Request.post(Urls.auth.checkUserNameUrl, { handle: userName })
  }

  static updateUserName(userId, handle, referralHandle) {
    return Request.post(Urls.auth.updateUserNameUrl, { userId, handle, referralHandle })
  }

  static updateProfile(userId, handle, referralHandle, profilePicture) {
    return Request.post(Urls.auth.updateUserNameUrl, { userId, handle, referralHandle, profilePicture })
  }
  static updateUserNotificationToken(userId, deviceType, token) {
    return Request.post(Urls.auth.updateUserNotificationTokenUrl(userId),
    {
      userId,
      deviceType,
      token,
    })
  }

  static oauthToken() {
    return RequestOauth.post(Urls.auth.oAuthUrl, {
      grant_type: 'client_credentials'
    })
  }
}