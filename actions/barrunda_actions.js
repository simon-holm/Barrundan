import axios from 'axios'
import { FETCH_PARTICIPANTS } from './types'

export const userJoinBarrunda = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    //TODO - Jwt token måste sättas i headern??
    let { data, status } = await axios
      .post(
        'http://192.168.0.4:3070/barrunda/user', //ändra till rätt route sen
        {
          //token: fbToken
        },
        {
          Accept: 'application/json',
          Authorization: 'Bearer ',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      )
      .catch(e => console.log(e))

    // ändra till rätt sen ?
    if (status == 200) {
      fetchParticipants()
    }
  }
}

export const fetchParticipants = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    //TODO - Jwt token måste sättas i headern??
    let { data } = await axios
      .get(
        'http://192.168.0.4:3070/barrunda/users', //ändra till rätt route sen
        {
          //token: fbToken
        },
        {
          Accept: 'application/json',
          Authorization: 'Bearer ',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      )
      .catch(e => console.log(e))

    // ändra till rätt sen!
    if (data.barrunda.participants) {
      dispatch({
        type: FETCH_PARTICIPANTS,
        payload: data.barrunda.participants
      })
    }
  }
}
