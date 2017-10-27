import React, { Component } from 'react'
import { connect } from 'react-redux'
// Component bara för DEV och tester

import axios from 'axios'
import {
  AsyncStorage,
  Button,
  View,
  Text,
  StyleSheet,
  Platform,
  Image
} from 'react-native'

import {
  facebookLogin,
  barrundanCreateUser,
  removeToken
} from '../actions/auth_actions'

import { clearOldBarrunda } from '../actions/barrunda_actions'

class MapScreen extends Component {
  state = { fbData: null }

  componentDidUpdate() {
    console.log(this.state.fbData)
  }

  fetchFbProfile = token => {
    axios
      .get(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`
      )
      .then(response => this.setState({ fbData: response.data }))
  }

  //BARA TEST TA BORT SEN
  testBarrundanCreateUser = async token => {
    console.log('testbarrundna med token', token)
    let { data } = await axios
      .post(
        'http://localhost:3070/user',
        {
          token
        },
        {
          Accept: 'application/json',
          Authorization: 'Bearer ',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      )
      .catch(e => console.log(e))
    console.log(data)
  }

  render() {
    const { container, text } = styles

    return (
      <View style={container}>
        {this.props.token ? (
          <View>
            <Text style={text}>NU INLOGGAD</Text>
            <Button
              title="Ta bort FB_TOKEN & JWT"
              onPress={() => this.props.removeToken()}
            />
            <Button
              title="Hämta FB Profil"
              onPress={() => this.fetchFbProfile(this.props.token)}
              style={{ marginTop: 10 }}
            />
            {this.state.fbData ? (
              <View style={{ marginTop: 5 }}>
                <Image
                  source={{ uri: this.state.fbData.picture.data.url }}
                  style={{ height: 50, width: 50 }}
                />
                <Text style={text}>{this.state.fbData.name}</Text>
              </View>
            ) : null}
            <Button
              title="BARRUNDAN CREATE USER TEST"
              onPress={() => this.testBarrundanCreateUser(this.props.token)}
              style={{ marginTop: 10 }}
            />
            <View style={{ marginTop: 15 }}>
              <Button
                title="BACK TO MAIN SCREEN"
                onPress={() => this.props.navigation.navigate('main')}
                style={{ marginTop: 10 }}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Button
                title="CLEAR OLD BARRUNDA"
                onPress={() => this.props.clearOldBarrunda()}
                style={{ marginTop: 10 }}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={text}>1. Ta bort barrundan från din Facebook</Text>
            <Text style={text}>2. Starta om appen</Text>
          </View>
        )}
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

export default connect(mapStateToProps, { removeToken, clearOldBarrunda })(
  MapScreen
)
