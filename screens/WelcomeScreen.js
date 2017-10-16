import _ from 'lodash'
import React, { Component } from 'react'
import { AppLoading } from 'expo'
import { View, Text, AsyncStorage } from 'react-native'

import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Välkommen till Barrundan', color: '#03A9F4' },
  {
    text: 'En ny runda varje vecka',
    color: '#009688'
  },
  { text: 'Aldrig mer kröka alena', color: '#03A9F4' },
  { text: 'Här kan det stå nått intressant, kanske en bild', color: '#009688' },
  { text: 'Här är sista slajden, Nu till FacebookLogin', color: '#03A9F4' }
]

class WelcomeScreen extends Component {
  state = { isReady: false }

  async fetchCache() {
    // Om man vill hämta något innan appen "startar", t.ex. requira bilder
    // denna funktioner tillåter bara "hämtningr, alltså inte setState eller navigering - Expo"
  }

  // componentDidMount() {
  //   // ifall man vill bypassa auth
  //   console.log('welcome mountades')
  //   this.props.navigation.navigate('main')
  // }

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
      this.props.navigation.navigate('auth')
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
