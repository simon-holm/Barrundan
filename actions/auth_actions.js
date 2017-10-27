import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { Facebook, Permissions, Notifications } from 'expo'
import { showErrorAlert } from './alert_actions'
// Actions types
export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success'
export const FACEBOOK_LOGIN_FAIL = 'facebook_login_fail'
export const REMOVE_FB_TOKEN = 'remove_fb_token'
export const SET_JWT = 'set_jwt'
export const SET_USER = 'set_user'

import { API_BASE_URL, FB_ID } from '../config/settings'

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token')

  if (token) {
    // Dispatch action FB login är klart
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    // Starta upp FB Login processen
    await doFacebookLogin(dispatch)
  }
}

const doFacebookLogin = async dispatch => {
  /* 
    Kallar på Facebook API med hjälp av Expo-modul
    Vid success så dispatchas en action till Redux reducern med data från resultatet
  */
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_ID, {
    permissions: ['public_profile']
  })

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token)
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
}

export const removeToken = () => async dispatch => {
  /* 
    Rensar tokens
  */
  await AsyncStorage.removeItem('fb_token')
  await AsyncStorage.removeItem('jwt')
  dispatch({ type: REMOVE_FB_TOKEN })
}

export const barrundanCreateUser = () => async dispatch => {
  /* 
    Kallar på Barrunda API för att skapa en user och få access token
    Vid success så dispatchas actions till Redux reducern med data från resultatet
  */
  let fbToken = await AsyncStorage.getItem('fb_token')
  console.log('fb token in barrundanCreateUser', fbToken)
  let result
  try {
    let { data } = await axios.post(
      API_BASE_URL + '/users',
      {
        token: fbToken
      },
      {
        Accept: 'application/json',
        Authorization: 'Bearer',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    )
    result = data
  } catch (e) {
    console.log(e)
    return dispatch(showErrorAlert())
  }

  const token = result.token
  const user = result.user

  await AsyncStorage.setItem('user', JSON.stringify(user))
  await AsyncStorage.setItem('jwt', token)

  dispatch({ type: SET_USER, payload: user })
  dispatch({ type: SET_JWT, payload: token })
}

export const registerForPushNotificationsAsync = userId => async dispatch => {
  /* 
    Frågar efter tillåtelse för att skicka push notikationer -->
    Kallar Barrunda API med det genererade push-tokenet (från Expo) 
    för att registrera användaren för push notifikationer
  */
  let previousToken = await AsyncStorage.getItem('pushToken')

  if (previousToken) {
    return
  } else {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return
    }

    // Get the token that uniquely identifies this device
    let pushToken = await Notifications.getExpoPushTokenAsync()

    let jwtToken = await AsyncStorage.getItem('jwt')
    const authString = 'Bearer ' + jwtToken
    try {
      let { data } = await axios.post(
        API_BASE_URL + '/user/pushtoken',
        {
          pushToken: pushToken,
          userId: userId
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString
          }
        }
      )
      if (data) {
        AsyncStorage.setItem('pushToken', pushToken)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
