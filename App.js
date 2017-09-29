import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './store'

import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import FirstScreen from './screens/FirstScreen'

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              first: { screen: FirstScreen }
              //deck: { screen: DeckScreen },
              // review: {
              //   screen: StackNavigator({
              //     review: { screen: ReviewScreen },
              //     settings: { screen: SettingsScreen }
              //   })
              // }
            },
            {
              lazy: true,
              swipeEnabled: false,
              animationEnabled: false,
              tabBarPosition: 'bottom',
              tabBarOptions: {
                labelStyle: { fontSize: 12 },
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
        animationEnabled: false,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
})
