import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Finished extends Component {
  render() {
    const { finishTextWrapper, finishTextFirst, finishTextSecond } = styles
    return (
      <View style={finishTextWrapper}>
        <Text style={finishTextFirst}>Veckans Barrunda är över</Text>
        <Text style={finishTextSecond}>
          Nästa Barrunda öppnar för anmälning
        </Text>
        <Text style={[finishTextSecond, { color: '#FF934F', fontSize: 18 }]}>
          Söndag kl 12:00
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  finishTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  finishTextFirst: {
    color: '#dddddd',
    fontSize: 25,
    marginBottom: 20
  },
  finishTextSecond: {
    color: '#dddddd',
    fontSize: 16
  }
})

export default Finished
