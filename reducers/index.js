import { combineReducers } from 'redux'
import auth from './auth_reducer'
import barrunda from './barrunda_reducer'

export default combineReducers({
  auth,
  barrunda
})
