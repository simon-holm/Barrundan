import { FETCH_PARTICIPANTS } from '../actions/types'

INITIAL_STATE = {
  participants: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return { ...state, participants: action.payload }
    default:
      return state
  }
}
