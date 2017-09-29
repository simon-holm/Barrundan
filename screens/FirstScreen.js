import React, { Component } from 'react'
import {
  AsyncStorage,
  Button,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

class FirstScreen extends Component {
  render() {
    const { container } = styles

    return (
      <View style={container}>
        <Text>NU INLOGGAD</Text>
        <Button
          title="Ta bort FB_TOKEN"
          onPress={() => AsyncStorage.removeItem('fb_token')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0,
    alignItems: 'center'
  }
})

export default FirstScreen
