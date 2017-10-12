import axios from 'axios'
import { FETCH_PARTICIPANTS } from './types'

export const userJoinBarrunda = () => async dispatch => {
  let jwtToken = await AsyncStorage.getItem('jwt')
  if (jwtToken) {
    //TODO - Jwt token måste sättas i headern??
    let { data, status } = await axios
      .post(
        'http://localhost:3070/barrunda/participants', //ändra till rätt route sen
        {
          userId: '121212121'
        },
        {
          Accept: 'application/json',
          Authorization: `Bearer${jwtToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      )
      .catch(e => console.log(e))

    // ändra till rätt sen ?
    if (status === 200) {
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
        'http://localhost:3070/barrunda/participants', //ändra till rätt route sen
        {},
        {
          Accept: 'application/json',
          Authorization: `Bearer${jwtToken}`,
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
