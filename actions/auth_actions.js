import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types'

// AsyncStorage är promised based. såå assyyyyync aawaiiiit

export const facebookLogin = () => async dispatch => {
  //see if token exists
  let token = await AsyncStorage.getItem('fb_token')

  if (token) {
    // Dispatch action FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    // Start up FB Login process
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
