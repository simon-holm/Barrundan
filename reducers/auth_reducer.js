import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REMOVE_FB_TOKEN
} from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null }
    case REMOVE_FB_TOKEN:
      return { token: null }
    default:
      return state
  }
}
