import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './store'

import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import SecondScreen from './screens/SecondScreen'
import ThirdScreen from './screens/ThirdScreen'

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              rundan: { screen: MapScreen },
              andra: { screen: SecondScreen },
              tredje: { screen: ThirdScreen }
            },
            {
              lazy: true,
              swipeEnabled: false,
              animationEnabled: true,
              tabBarPosition: 'bottom',
              tabBarOptions: {
                style: { height: 60, backgroundColor: 'transparent' },
                tabStyle: { backgroundColor: 'transparent' },
                labelStyle: { fontSize: 12, top: -20 },
                indicatorStyle: { backgroundColor: '#FFBB00' },
                showIcon: true,
                iconStyle: { width: 30 }
              }
            }
          )
        }
      },
      {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarOptions: {
          labelStyle: { fontSize: 12 },
          showIcon: true
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
