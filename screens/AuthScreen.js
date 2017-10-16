import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import {
  facebookLogin,
  barrundanCreateUser,
  removeToken,
  registerForPushNotificationsAsync
} from '../actions/auth_actions'

class AuthScreen extends Component {
  componentDidMount() {
    console.log('AuthScreen mount', this.props)
    this.props.facebookLogin()
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('auth received props', nextProps)
    this.onAuthComplete(nextProps)
  }

  async onAuthComplete(props) {
    // finns både facebook token och jwt så är vi välkomna in
    // annars måste vi skapa användaren i barrundan API
    // så vi kollar först om ett JWT token finns
    if (props.token && !props.jwt) {
      console.log('JWT is missing in authComplete')
      console.log('Calling barrundanCreateUser')
      this.props.barrundanCreateUser()
    } else if (props.token && props.jwt) {
      await this.props.registerForPushNotificationsAsync(props.user._id)
      console.log('ready to continue')
      this.props.navigation.navigate('main')
    }

    //this.props.removeToken()
  }

  render() {
    return <View />
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token, jwt: auth.jwt, user: auth.user }
}

export default connect(mapStateToProps, {
  facebookLogin,
  barrundanCreateUser,
  removeToken,
  registerForPushNotificationsAsync
})(AuthScreen)
