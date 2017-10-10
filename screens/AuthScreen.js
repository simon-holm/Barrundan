import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as actions from '../actions'

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin()
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // har vi fått ett facebook token men jwt är null
    // så måste vi skapa user i barrundan databas
    if (nextProps.token && _.isNull(nextProps.jwt)) {
      return this.props.barrundanCreateUser()
    }
    this.onAuthComplete(nextProps)
  }

  onAuthComplete(props) {
    // finns både facebook token och jwt så är vi välkomna in
    if (props.token && props.jwt) {
      this.props.navigation.navigate('main')
    }
  }

  render() {
    return <View />
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token, jwt: auth.jwt }
}

export default connect(mapStateToProps, actions)(AuthScreen)
