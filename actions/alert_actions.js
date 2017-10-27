import { Alert } from 'react-native'

export const SHOW_ERROR = 'show_error'

export const showErrorAlert = () => dispatch => {
  Alert.alert('Något gick fel :(', 'Det är vårt fel, gå och gör något annat', [
    { text: 'Ok' }
  ])
  dispatch({ type: SHOW_ERROR })
}
