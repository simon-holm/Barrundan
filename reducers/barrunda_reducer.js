import { FETCH_PARTICIPANTS, FETCH_BARRUNDA } from '../actions/barrunda_actions'

INITIAL_STATE = {
  participants: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return { ...state, participants: action.payload }
    case FETCH_BARRUNDA:
      return { ...state, barrunda: action.payload }
    default:
      return state
  }
}
