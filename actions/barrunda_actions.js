import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { ShowErrorAlert } from '../helpers/alert'

// Action types
export const FETCH_PARTICIPANTS = 'fetch_participants'
export const FETCH_BARRUNDA = 'fetch_barrunda'
export const USER_JOIN_SUCCESS = 'user_join_success'
export const CLEAR_BARRUNDA = 'clear_barrunda'
export const FETCH_CURRENT_BAR = 'fetch_current_bar'

import { API_BASE_URL } from '../config/settings'

export const fetchBarrunda = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let result
    try {
      let data = await axios.get(API_BASE_URL + '/barrunda', {
        headers: {
          Accept: 'application/json',
          Authorization: authString
        }
      })
      result = data
      console.log(result)
    } catch (e) {
      console.log(e)
      ShowErrorAlert()
    }

    if (result) {
      dispatch({
        type: FETCH_BARRUNDA,
        payload: result
      })
    }
  }
}

export const userJoinBarrunda = (userId, barrundaId) => async dispatch => {
  console.log('user join barrunda!')
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { status } = await axios
      .post(
        API_BASE_URL + '/barrunda/participants',
        {
          userId: userId,
          barrundaId: barrundaId
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString
          }
        }
      )
      .catch(e => console.log(e))

    // KALLA PÅ fetchParticipants här ???
    console.log(status)
    if (status === 200) {
      dispatch({
        type: USER_JOIN_SUCCESS
      })
    }
  }
}

export const userAlreadyJoinedBarrunda = () => dispatch => {
  dispatch({
    type: USER_JOIN_SUCCESS
  })
}

export const fetchParticipants = barrundaId => async dispatch => {
  console.log('fetch participants')

  let jwtToken = await AsyncStorage.getItem('jwt')

  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { data } = await axios
      .get(API_BASE_URL + '/barrunda/participants/' + barrundaId, {
        headers: {
          Accept: 'application/json',
          Authorization: authString,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .catch(e => console.log(e))

    if (data) {
      dispatch({
        type: FETCH_PARTICIPANTS,
        payload: data
      })
    }
  }
}

export const clearOldBarrunda = () => dispatch => {
  dispatch({ type: CLEAR_BARRUNDA })
}

export const fetchCurrentBar = barrundaId => async dispatch => {
  console.log('fetch current bar')
  let jwtToken = await AsyncStorage.getItem('jwt')

  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { data } = await axios
      .get(API_BASE_URL + '/barrunda/bar/' + barrundaId, {
        headers: {
          Accept: 'application/json',
          Authorization: authString,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .catch(e => console.log(e))

    if (data) {
      dispatch({
        type: FETCH_CURRENT_BAR,
        payload: data
      })
    }
  }
}
