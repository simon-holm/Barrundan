import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './store'

import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DevScreen from './screens/DevScreen'
import MainScreen from './screens/MainScreen'

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        home: {
          screen: TabNavigator(
            {
              main: { screen: MainScreen },
              map: { screen: MapScreen },
              dev: { screen: DevScreen }
            },
            {
              lazy: true,
              swipeEnabled: false,
              animationEnabled: true,
              navigationOptions: {
                tabBarVisible: false
              }
            }
          )
        }
      },
      {
        lazy: true,
        swipeEnabled: false,
        animationEnabled: false,
        navigationOptions: {
          tabBarVisible: false
        }
      }
    )

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13213a',
    justifyContent: 'center'
  }
})
