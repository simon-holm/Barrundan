import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native'
import { MapView } from 'expo'
import { mapStyles } from '../helpers/mapStyles'

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      latitude: 55.607734,
      longitude: 13.000319,
      latitudeDelta: 0.01125, // standard 0.09
      longitudeDelta: 0.005 // standard 0.04
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true })
  }

  onRegionChangeComplete = region => {
    this.setState({ region })
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    const { region } = this.state

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          customMapStyle={mapStyles.night}
        />
        <Button
          title="BACK"
          onPress={() => this.props.navigation.navigate('main')}
        />
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
  }
})

const mapStateToProps = ({ auth }) => {
  return { token: auth.token }
}

export default connect(mapStateToProps, null)(MapScreen)
