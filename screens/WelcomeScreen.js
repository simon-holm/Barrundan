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

  componentWillMount() {
    this.fetchCache()
  }

  async fetchCache() {
    let token = await AsyncStorage.getItem('fb_token')
    let jwt = await AsyncStorage.getItem('jwt')
    if (token && jwt) {
      console.log('navigeras till main')
      await this.props.navigation.navigate('main')
    }
    this.setState({ isReady: true })
    //AsyncStorage.removeItem('fb_token')
  }
  // componentDidMount() {
  //   // ifall man vill bypassa auth
  //   console.log('welcome mountades')
  //   this.props.navigation.navigate('main')
  // }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
  }
}

export default WelcomeScreen
