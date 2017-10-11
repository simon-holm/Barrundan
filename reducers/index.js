import { combineReducers } from 'redux'
import auth from './auth_reducer'
import barrunda from './barrunda_reducer'

export default combineReducers({
  auth,
  barrunda // importera "default" från reducern kalla det vad man vill statet ska heta. här blire auth.
})
