import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import { Button } from 'react-native-elements'
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
  componentWillReceiveProps(newProps) {
    this.setState({
      region: {
        latitude: newProps.currentBar.location.lat,
        longitude: newProps.currentBar.location.lng,
        latitudeDelta: 0.01125,
        longitudeDelta: 0.005
      }
    })
  }
  componentDidMount() {
    this.setState({
      mapLoaded: true,
      region: {
        latitude: this.props.currentBar.location.lat,
        longitude: this.props.currentBar.location.lng,
        latitudeDelta: 0.01125,
        longitudeDelta: 0.005
      }
    })
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
        >
          <MapView.Marker
            image={require('../assets/icons/barLocation.png')}
            title={this.props.currentBar.name}
            description={this.props.currentBar.address}
            coordinate={{
              latitude: this.props.currentBar.location.lat,
              longitude: this.props.currentBar.location.lng
            }}
          />
          <MapView.Marker
            title={'Här är din platss'}
            coordinate={{
              latitude: 55.608734,
              longitude: 13.000919
            }}
          />
        </MapView>

        <View style={styles.buttonWrapper}>
          <Button
            title="Tillbaka"
            buttonStyle={{
              backgroundColor: 'rgba(62, 92, 118, 0.8)',
              borderRadius: 50
            }}
            textStyle={{ color: '#dddddd' }}
            onPress={() => this.props.navigation.navigate('main')}
          />
        </View>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')

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
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: width,
    paddingLeft: 40,
    paddingRight: 40
  }
})

const mapStateToProps = ({ auth, barrunda }) => {
  return { token: auth.token, currentBar: barrunda.currentBar }
}

export default connect(mapStateToProps, null)(MapScreen)
