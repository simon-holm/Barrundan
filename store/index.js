import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducers from '../reducers'

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk), autoRehydrate())
)
/* Lägg till whitelist: ['someReducer'] i options objektet nedan, om vi ska spara nått specifikt i localstorage/Asyncstorage */
persistStore(store, { storage: AsyncStorage }) // chain on '.purge()' to clear async

export default store
