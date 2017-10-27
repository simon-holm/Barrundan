import {
  FETCH_PARTICIPANTS,
  FETCH_BARRUNDA,
  USER_JOIN_SUCCESS,
  CLEAR_BARRUNDA,
  FETCH_CURRENT_BAR,
  USER_JOIN_FAIL
} from '../actions/barrunda_actions'

INITIAL_STATE = {
  participants: [],
  isJoined: false,
  currentBar: {},
  barrunda: null
}

export default function(state = INITIAL_STATE, action) {
  /* 
    Ändrar olika states beroende på vad som har dispatchats från Redux-barrunda-actions
  */
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return { ...state, participants: action.payload }
    case FETCH_BARRUNDA:
      return { ...state, barrunda: action.payload }
    case USER_JOIN_SUCCESS:
      return { ...state, isJoined: true }
    case USER_JOIN_FAIL:
      return { ...state, isJoined: false }
    case CLEAR_BARRUNDA:
      return INITIAL_STATE
    case FETCH_CURRENT_BAR:
      return { ...state, currentBar: action.payload }
    default:
      return state
  }
}
