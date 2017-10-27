import _ from 'lodash'
import React, { Component } from 'react'
import { AppLoading, Font } from 'expo'
import { View, Text, AsyncStorage, BackHandler } from 'react-native'

import Slides from '../components/Slides'

// Data för varje slide
const SLIDE_DATA = [{ text: 'logga', color: '#13213a' }]

class WelcomeScreen extends Component {
  state = { isReady: false }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }
  async fetchCache() {
    // Om man vill hämta något innan appen "startar", t.ex. requira bilder
    // denna funktioner tillåter bara "hämtningr, alltså inte setState eller navigering - Expo"
  }
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }
  androidBackButtonSetup = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.key !== 'main') {
        this.props.navigation.navigate('main')
        return true
      }
    })
  }
  finishGettingCache = async () => {
    this.androidBackButtonSetup()
    let token = await AsyncStorage.getItem('fb_token')
    let jwt = await AsyncStorage.getItem('jwt')

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
