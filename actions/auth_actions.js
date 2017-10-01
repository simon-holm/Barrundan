import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REMOVE_FB_TOKEN
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
  dispatch({ type: REMOVE_FB_TOKEN })
}
