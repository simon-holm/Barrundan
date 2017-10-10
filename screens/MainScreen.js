import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, View, Text, StyleSheet, Platform } from 'react-native'

import * as actions from '../actions'

class ThirdScreen extends Component {
  render() {
    const { container, text, barrundan } = styles

    return (
      <View style={container}>
        <Text style={barrundan}>Barrundan</Text>
        <Text style={text}>MAIN SCREEN</Text>
        <Button
          title="MAP"
          onPress={() => this.props.navigation.navigate('map')}
        />
        <View style={{ marginTop: 15 }}>
          <Button
            title="DEV SCREEN"
            onPress={() => this.props.navigation.navigate('dev')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13213a',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0,
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF'
  },
  barrundan: {
    position: 'absolute',
    top: 30,
    color: '#FFBB00',
    fontStyle: 'italic',
    //fontFamily: 'monospace',
    fontSize: 34
  }
})

const mapStateToProps = ({ auth }) => {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(ThirdScreen)
