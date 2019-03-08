import firebase from 'react-native-firebase'
import User from '../store/User'

// Build a channel
const channel = new firebase.notifications.Android.Channel('default', 'Default', firebase.notifications.Android.Importance.Max)
  .setDescription('SKTrivia default channel')

// Create the channel
firebase.notifications().android.createChannel(channel)


// Notification Handlers

// When app is closed
firebase.notifications().getInitialNotification()
  .then((notificationOpen) => {
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action
      // Get information about the notification that was opened
      const notification = notificationOpen.notification
    }
  })



firebase.notifications().onNotificationOpened((notificationOpen) => {
  // Get the action triggered by the notification being opened
  const action = notificationOpen.action
  // Get information about the notification that was opened
  const notification = notificationOpen.notification
})


export default class NoficationManager {

  static deviceToken = ''

  static getDeviceTokenForFirebase(callBack) {
    firebase.messaging().getToken()
    .then((fcmToken) => {
      if (fcmToken) {
        // user has a device token
        NoficationManager.deviceToken = fcmToken
        console.log('=====>>>>> device token: ', fcmToken)
        User.setToken(fcmToken)
      } else {
        console.log('!!!!!!!! device token not found')
        // user doesn't have a device token yet
      }
    })
  }

  static checkPermissions(callBack) {
    firebase.messaging().hasPermission()
    .then((enabled) => {
      if (enabled) {
        // user has permissions
        callBack(true)
      } else {
        // user doesn't have permission
        NoficationManager.requestPermission()
      } 
    })
  }

  static requestPermission() {
    firebase.messaging().requestPermission()
    .then(() => {
      // User has authorised
    })
    .catch(error => {
      // User has rejected permissions  
    })
  }
}