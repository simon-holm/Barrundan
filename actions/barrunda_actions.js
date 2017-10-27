import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { showErrorAlert } from './alert_actions'

import { API_BASE_URL } from '../config/settings'

// Action types
export const FETCH_PARTICIPANTS = 'fetch_participants'
export const FETCH_BARRUNDA = 'fetch_barrunda'
export const USER_JOIN_SUCCESS = 'user_join_success'
export const USER_JOIN_FAIL = 'user_join_fail'
export const CLEAR_BARRUNDA = 'clear_barrunda'
export const FETCH_CURRENT_BAR = 'fetch_current_bar'

export const fetchBarrunda = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let result
    try {
      let { data } = await axios.get(API_BASE_URL + '/barrunda', {
        headers: {
          Accept: 'application/json',
          Authorization: authString
        }
      })
      result = data
    } catch (e) {
      console.log(e)
      return dispatch(showErrorAlert())
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
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    try {
      await axios.post(
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
    } catch (e) {
      console.log(e)
      return dispatch(showErrorAlert())
    }

    dispatch({
      type: USER_JOIN_SUCCESS
    })
    dispatch(fetchParticipants(barrundaId))
  }
}

export const userAlreadyJoinedBarrunda = () => dispatch => {
  dispatch({
    type: USER_JOIN_SUCCESS
  })
}

export const userHasNotJoinedBarrunda = () => dispatch => {
  dispatch({
    type: USER_JOIN_FAIL
  })
}

export const fetchParticipants = barrundaId => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let result
    try {
      let { data } = await axios.get(
        API_BASE_URL + '/barrunda/participants/' + barrundaId,
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      result = data
    } catch (e) {
      console.log(e)
      return dispatch(showErrorAlert())
    }
    if (result) {
      dispatch({
        type: FETCH_PARTICIPANTS,
        payload: result
      })
    }
  }
}

export const clearOldBarrunda = () => dispatch => {
  dispatch({ type: CLEAR_BARRUNDA })
}

export const fetchCurrentBar = barrundaId => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    let result
    const authString = 'Bearer ' + jwtToken
    try {
      let { data } = await axios.get(
        API_BASE_URL + '/barrunda/bar/' + barrundaId,
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      result = data
    } catch (e) {
      console.log(e)
      return dispatch(showErrorAlert())
    }

    if (result) {
      dispatch({
        type: FETCH_CURRENT_BAR,
        payload: result
      })
    }
  }
}
