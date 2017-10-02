import { combineReducers } from 'redux'
import auth from './auth_reducer'

export default combineReducers({
  auth // importera "default" från reducern kalla det vad man vill statet ska heta. här blire auth.
})
