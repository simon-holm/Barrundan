import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { Button, Icon, List, ListItem, Card } from 'react-native-elements'

import Timer from '../components/Timer'
import ParticipantsList from '../components/ParticipantsList'

import {
  userJoinBarrunda,
  fetchParticipants
} from '../actions/barrunda_actions'

// Fake data - ska bytas mot this.props.participants sen!
const participants = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  }
]

class Mainscreen extends Component {
  componentWillMount() {
    console.log('fetch participants')
    // TODO
    // kalla på this.props.fetchParticipants() här!
  }
  componentDidMount() {
    console.log('Main mountades')
  }
  userJoinBarrunda = () => {
    console.log('user join barrunda!')
    // TODO
    // kalla på this.props.userJoinBarrunda() här!
  }
  render() {
    const { container, text, title, joinButton } = styles

    return (
      <ScrollView style={container}>
        <Text style={title}>Barrundan</Text>

        <Text style={text}>Barrundan startar om:</Text>
        <Timer />

        <View style={joinButton}>
          <Button
            title="GÅ MED"
            large
            raised
            buttonStyle={{
              backgroundColor: '#4277f4',
              borderRadius: 50
            }}
            fontSize={22}
            textStyle={{ textAlign: 'center' }}
            onPress={this.userJoinBarrunda}
          />
        </View>

        <Text style={text}>Deltagare just nu:</Text>
        <ParticipantsList participants={participants} />

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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13213a',
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  title: {
    color: '#FFBB00',
    marginTop: 30,
    fontStyle: 'italic',
    fontSize: 34,
    alignSelf: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 60,
    alignSelf: 'center'
  },
  joinButton: {
    flex: 1,
    marginTop: 30
  }
})

const mapStateToProps = ({ auth, barrunda }) => {
  return {
    fbToken: auth.token,
    jwt: auth.jwt,
    participants: barrunda.participants
  }
}

export default connect(mapStateToProps, {
  userJoinBarrunda,
  fetchParticipants
})(Mainscreen)
