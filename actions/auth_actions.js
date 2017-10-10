import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REMOVE_FB_TOKEN,
  SET_JWT
} from './types'

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

  let { data } = await axios
    .post(
      'http://localhost:3070/user', // localhost IP adress. störigt
      {
        token: fbToken
      },
      {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    )
    .catch(e => console.log(e))

  const token = data.token
  await AsyncStorage.setItem('jwt', token)

  dispatch({ type: SET_JWT, payload: token })
}
