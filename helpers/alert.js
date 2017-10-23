import { Alert } from 'react-native'

export const ShowErrorAlert = () => {
  Alert.alert('Något gick fel :(', 'Det är vårt fel, gå och gör något annat', [
    { text: 'Ok' }
  ])
}
