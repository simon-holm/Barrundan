import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { Facebook, Permissions, Notifications } from 'expo'

// Actions types
export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success'
export const FACEBOOK_LOGIN_FAIL = 'facebook_login_fail'
export const REMOVE_FB_TOKEN = 'remove_fb_token'
export const SET_JWT = 'set_jwt'
export const SET_USER = 'set_user'

// AsyncStorage tar lite tid och är promised based. såå async await

export const facebookLogin = () => async dispatch => {
  //Kolla om token finns redan
  let token = await AsyncStorage.getItem('fb_token')

  if (token) {
    // Dispatch action FB login är klart
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    // Starta upp FB Login processen
    doFacebookLogin(dispatch)
  }
}

const doFacebookLogin = async dispatch => {
  console.log('facebook login')
  let {
    type,
    token
  } = await Facebook.logInWithReadPermissionsAsync('285326111967936', {
    permissions: ['public_profile']
  })

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token)
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
}

export const removeToken = () => async dispatch => {
  await AsyncStorage.removeItem('fb_token')
  await AsyncStorage.removeItem('jwt')
  dispatch({ type: REMOVE_FB_TOKEN })
}

// Barrundan API SKAPA USER => FÅ JWT
export const barrundanCreateUser = () => async dispatch => {
  let fbToken = await AsyncStorage.getItem('fb_token')
  console.log('fb token in barrundanCreateUser', fbToken)

  let { data } = await axios
    .post(
      'http://192.168.0.16:3070/users', // localhost IP adress. störigt
      {
        token: fbToken
      },
      {
        Accept: 'application/json',
        Authorization: 'Bearer',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    )
    .catch(e => console.log(e))

  const token = data.token
  const user = data.user

  await AsyncStorage.setItem('user', JSON.stringify(user))
  await AsyncStorage.setItem('jwt', token)

  dispatch({ type: SET_USER, payload: user })
  dispatch({ type: SET_JWT, payload: token })
}

export const registerForPushNotificationsAsync = userId => async dispatch => {
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

    let { data } = await axios.post(
      'http://192.168.0.16:3070/user/pushtoken',
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
  }
}
