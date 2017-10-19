import {
  FETCH_PARTICIPANTS,
  FETCH_BARRUNDA,
  USER_JOIN_SUCCESS,
  CLEAR_BARRUNDA
} from '../actions/barrunda_actions'

INITIAL_STATE = {
  participants: [],
  isJoined: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return { ...state, participants: action.payload }
    case FETCH_BARRUNDA:
      return { ...state, barrunda: action.payload }
    case USER_JOIN_SUCCESS:
      return { ...state, isJoined: true }
    case CLEAR_BARRUNDA:
      return INITIAL_STATE
    default:
      return state
  }
}
