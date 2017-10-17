import axios from 'axios'
import { AsyncStorage } from 'react-native'

// Action types
export const FETCH_PARTICIPANTS = 'fetch_participants'

export const userJoinBarrunda = userId => async dispatch => {
  console.log('user join barrunda!')

  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let data = await axios
      .put(
        'http://192.168.0.16:3070/barrunda/participants',
        {
          userId: userId
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: authString
          }
        }
      )
      .catch(e => console.log(e))

    console.log(data)
    // KALLA PÅ fetchParticipants här ???
  }
}

export const fetchParticipants = () => async dispatch => {
  console.log('fetch participants')

  let jwtToken = await AsyncStorage.getItem('jwt')

  if (jwtToken) {
    const authString = 'Bearer ' + jwtToken
    let { data } = await axios
      .get(
        'http://192.168.0.16:3070/barrunda/participants', //ändra till rätt route sen
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
