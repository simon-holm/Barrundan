import React, { Component } from 'react'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image
} from 'react-native'
import { Button, Icon, List, ListItem, Card } from 'react-native-elements'

import Timer from '../components/Timer'
import ParticipantsList from '../components/ParticipantsList'

import {
  userJoinBarrunda,
  fetchParticipants,
  fetchBarrunda,
  clearOldBarrunda,
  fetchCurrentBar,
  userAlreadyJoinedBarrunda
} from '../actions/barrunda_actions'

class Mainscreen extends Component {
  state = {
    loading: false
  }
  async componentWillMount() {
    // Lyssnar på push event och skickar alert
    console.log(this.props)
    let pushToken = await AsyncStorage.getItem('pushToken')
    if (pushToken) {
      Notifications.addListener(notification => {
        const { data: { text }, origin } = notification

        if ((origin === 'received') & text) {
          Alert.alert('New Push Notification', text, [{ text: 'Ok.' }])
        }
      })
    }
    await this.props.fetchBarrunda()
    await this.props.fetchCurrentBar(this.props.barrunda._id)
    await this.props.fetchParticipants(this.props.barrunda._id)
    this.props.participants.map(participant => {
      if (participant._id === this.props.user._id) {
        this.props.userAlreadyJoinedBarrunda()
      }
    })
  }
  componentDidMount() {
    console.log('Main mountades')
  }
  userJoinBarrunda = async () => {
    this.setState({ loading: true })
    await this.props.userJoinBarrunda(
      this.props.user._id,
      this.props.barrunda._id
    )

    setTimeout(async () => {
      if (this.props.isJoined) {
        await this.props.fetchParticipants(this.props.barrunda._id)
        this.setState({ loading: false })
      }
    }, 500)
  }
  renderBarinfo() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} />
        </View>
      )
    } else if (!this.props.isJoined) {
      return (
        <View style={styles.joinButton}>
          <Button
            title="GÅ MED"
            buttonStyle={{
              backgroundColor: '#3E5C76',
              borderRadius: 50,
              height: 55
            }}
            fontSize={16}
            textStyle={{ textAlign: 'center', color: '#dddddd' }}
            onPress={this.userJoinBarrunda}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.barInfoWrapper}>
          <Text style={styles.barInfoText}>{this.props.currentBar.name}</Text>
          <Button
            icon={{ name: 'location-on', color: '#dddddd', size: 22 }}
            title="Visa karta"
            buttonStyle={{
              backgroundColor: '#3E5C76',
              borderRadius: 50,
              width: 150,
              height: 45
            }}
            fontSize={15}
            textStyle={{ textAlign: 'center', color: '#dddddd' }}
            onPress={() => this.props.navigation.navigate('map')}
          />
        </View>
      )
    }
  }
  render() {
    const { container, text, textSecond, title, participantList } = styles
    const imageStyle = !this.props.isJoined
      ? {
          width: 350,
          flex: 1,
          alignSelf: 'center',
          height: 250,
          marginTop: 20,
          marginBottom: 20
        }
      : {
          width: 200,
          flex: 1,
          alignSelf: 'center',
          height: 130,
          marginTop: 15,
          marginBottom: 15
        }
    return (
      <ScrollView style={container}>
        <Image
          resizeMode={'contain'}
          source={require('../assets/icons/barrundan.png')}
          style={imageStyle}
        />
        {this.props.currentBar ? (
          <View>
            <Text style={text}>Startar om</Text>
            <Timer startTime={this.props.currentBar.startTime} />
          </View>
        ) : null}
        {this.renderBarinfo()}

        {this.props.participants.length > 0 ? (
          <View style={participantList}>
            <Text style={textSecond}>
              {this.props.participants.length} deltagare
            </Text>
            <ParticipantsList participants={this.props.participants} />
          </View>
        ) : null}

        {/* <View style={{ marginTop: 15 }}>
          <Button
            title="MAP"
            onPress={() => this.props.navigation.navigate('map')}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Button
            title="DEV SCREEN"
            onPress={() => this.props.navigation.navigate('dev')}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            title="CLEAR OLD BARRUNDA"
            onPress={() => this.props.clearOldBarrunda()}
            style={{ marginTop: 10 }}
          />
        </View> */}
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
    color: '#f9c840',
    marginTop: Platform.OS === 'android' ? 20 : 30,
    fontSize: 32,
    alignSelf: 'center'
  },
  text: {
    color: '#dddddd',
    fontSize: 20,
    marginTop: 0,
    alignSelf: 'center'
  },
  textSecond: {
    color: '#dddddd',
    fontSize: 20,
    marginTop: 30,
    alignSelf: 'center'
  },
  joinButton: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  barInfoWrapper: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  barNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5
  },
  barInfoText: {
    color: '#dddddd',
    fontSize: 26,
    marginBottom: 20
  },
  loadingIcon: {
    marginTop: 30,
    flex: 1
  },
  participantList: {
    marginTop: 5,
    alignItems: 'center'
  }
})

const mapStateToProps = ({ auth, barrunda }) => {
  return {
    fbToken: auth.token,
    jwt: auth.jwt,
    user: auth.user,
    participants: barrunda.participants,
    barrunda: barrunda.barrunda,
    isJoined: barrunda.isJoined,
    currentBar: barrunda.currentBar
  }
}

export default connect(mapStateToProps, {
  userJoinBarrunda,
  fetchParticipants,
  fetchBarrunda,
  clearOldBarrunda,
  fetchCurrentBar,
  userAlreadyJoinedBarrunda
})(Mainscreen)
