import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REMOVE_FB_TOKEN,
  SET_JWT,
  SET_USER
} from '../actions/auth_actions'

INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  /* 
    Ändrar olika states beroende på vad som har dispatchats från Redux-authentication-actions
  */
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload }
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null }
    case REMOVE_FB_TOKEN:
      return { token: null, jwt: null }
    case SET_JWT:
      return { ...state, jwt: action.payload }
    case SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
