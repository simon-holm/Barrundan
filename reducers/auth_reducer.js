import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REMOVE_FB_TOKEN,
  SET_JWT
} from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload }
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null }
    case REMOVE_FB_TOKEN:
      return { token: null, jwt: null }
    case SET_JWT:
      return { ...state, jwt: action.payload }
    default:
      return state
  }
}