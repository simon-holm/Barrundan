import _ from 'lodash'
import React, { Component } from 'react'
import { AppLoading, Font } from 'expo'
import { View, Text, AsyncStorage } from 'react-native'

import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'logga', color: '#13213a' },
  {
    text: 'Barrunda i Malmö',
    text2: 'Varje lördag klockan 20:00',
    text3: 'Häng med!',
    color: '#5db596'
  }
]

class WelcomeScreen extends Component {
  state = { isReady: false }

  async fetchCache() {
    // Om man vill hämta något innan appen "startar", t.ex. requira bilder
    // denna funktioner tillåter bara "hämtningr, alltså inte setState eller navigering - Expo"
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }
  finishGettingCache = async () => {
    let token = await AsyncStorage.getItem('fb_token')
    let jwt = await AsyncStorage.getItem('jwt')
    console.log(jwt, token)

    if (token && jwt) {
      console.log('navigeras till main')
      this.setState({ isReady: true })
      this.props.navigation.navigate('main')
    } else {
      this.setState({ isReady: true })
    }
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.fetchCache}
          onFinish={this.finishGettingCache}
          onError={() => console.warn}
        />
      )
    }
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
  }
}

export default WelcomeScreen
