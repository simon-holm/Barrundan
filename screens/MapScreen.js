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
import { Button, SocialIcon } from 'react-native-elements'
import { MapView, Constants, Permissions, Location } from 'expo'
import { mapStyles } from '../helpers/mapStyles'

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    userPosition: {},
    region: {
      latitude: 55.607734,
      longitude: 13.000319,
      latitudeDelta: 0.01125, // standard 0.09
      longitudeDelta: 0.005 // standard 0.04
    }
  }
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log('error')
    } else {
      this._getLocationAsync()
    }
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
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      console.log('error')
    }
    let location = await Location.getCurrentPositionAsync({})
    let userPosition = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01125,
      longitudeDelta: 0.005
    }
    this.setState({ userPosition })
  }
  setRegionToUser() {
    if (this.state.userPosition) {
      this.setState({
        region: this.state.userPosition
      })
    } else {
      console.log('Vi kan inte visa din plats')
    }
  }
  setRegionToBar() {
    this.setState({
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
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          customMapStyle={mapStyles.night}
          provider={MapView.PROVIDER_GOOGLE}
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
          {this.state.userPosition ? (
            <MapView.Marker
              title={'Din plats'}
              coordinate={{
                latitude: this.state.userPosition.latitude || 0,
                longitude: this.state.userPosition.longitude || 0
              }}
            />
          ) : null}
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
        <View style={styles.locationWrapper}>
          <Button
            icon={{ name: 'accessibility', color: '#dddddd', size: 28 }}
            buttonStyle={{
              backgroundColor: 'rgba(62, 92, 118, 0.7)',
              borderRadius: 50,
              height: 50,
              width: 50,
              marginBottom: 10,
              paddingLeft: 10,
              paddingRight: 0
            }}
            textStyle={{ color: '#dddddd' }}
            onPress={() => this.setRegionToUser()}
          />
          <Button
            icon={{
              name: 'md-beer',
              type: 'ionicon',
              color: '#f4d941',
              size: 28
            }}
            buttonStyle={{
              backgroundColor: 'rgba(62, 92, 118, 0.7)',
              borderRadius: 50,
              height: 50,
              width: 50,
              marginBottom: 10,
              paddingLeft: 10,
              paddingRight: 0
            }}
            textStyle={{ color: '#dddddd' }}
            onPress={() => this.setRegionToBar()}
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
  },
  locationWrapper: {
    position: 'absolute',
    top: 35,
    right: -5
  }
})

const mapStateToProps = ({ auth, barrunda }) => {
  return { token: auth.token, currentBar: barrunda.currentBar }
}

export default connect(mapStateToProps, null)(MapScreen)
