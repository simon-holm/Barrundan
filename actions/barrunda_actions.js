import axios from 'axios'
import { AsyncStorage } from 'react-native'

// Action types
export const FETCH_PARTICIPANTS = 'fetch_participants'
export const FETCH_BARRUNDA = 'fetch_barrunda'
export const USER_JOIN_SUCCESS = 'user_join_success'
export const CLEAR_BARRUNDA = 'clear_barrunda'

import { API_BASE_URL } from '../config/settings'

export const fetchBarrunda = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { data } = await axios
      .get(API_BASE_URL + '/barrunda', {
        headers: {
          Accept: 'application/json',
          Authorization: authString
        }
      })
      .catch(e => console.log(e))
    if (data) {
      dispatch({
        type: FETCH_BARRUNDA,
        payload: data
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

export const fetchParticipants = barrundaId => async dispatch => {
  console.log('fetch participants')

  let jwtToken = await AsyncStorage.getItem('jwt')

  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { data } = await axios
      .get(
        API_BASE_URL + '/barrunda/participants/' + barrundaId, //ändra till rätt route sen
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
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
