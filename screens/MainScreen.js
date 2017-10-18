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
  AsyncStorage
} from 'react-native'
import { Button, Icon, List, ListItem, Card } from 'react-native-elements'

import Timer from '../components/Timer'
import ParticipantsList from '../components/ParticipantsList'

import {
  userJoinBarrunda,
  fetchParticipants,
  fetchBarrunda,
  clearOldBarrunda
} from '../actions/barrunda_actions'

class Mainscreen extends Component {
  state = {
    joinedBar: false,
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
    this.props.fetchParticipants(this.props.barrunda._id)
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
            large
            buttonStyle={{
              backgroundColor: '#4277f4',
              borderRadius: 50
            }}
            fontSize={22}
            textStyle={{ textAlign: 'center' }}
            onPress={this.userJoinBarrunda}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.barInfoWrapper}>
          <Text style={styles.barNumberText}>Bar 1:</Text>
          <Text style={styles.barInfoText}>BrewDog Bar Malmö</Text>
          <Button
            title="Karta"
            buttonStyle={{
              backgroundColor: '#4277f4',
              borderRadius: 50
            }}
            fontSize={15}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.props.navigation.navigate('map')}
          />
        </View>
      )
    }
  }
  render() {
    const { container, text, title } = styles

    return (
      <ScrollView style={container}>
        <Text style={title}>Barrundan</Text>

        <Text style={text}>Barrundan startar om:</Text>
        <Timer />

        {this.renderBarinfo()}

        {this.props.participants.length > 0 ? (
          <View>
            <Text style={text}>Deltagare just nu:</Text>
            <ParticipantsList participants={this.props.participants} />
          </View>
        ) : (
          <View>
            <Text>NÅN TREVLIG INFO / GREJJ HÄR NÄR INGA FINNS I LISTA</Text>
          </View>
        )}

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
        <View style={{ marginTop: 15 }}>
          <Button
            title="CLEAR OLD BARRUNDA"
            onPress={() => this.props.clearOldBarrunda()}
            style={{ marginTop: 10 }}
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
    marginTop: Platform.OS === 'android' ? 10 : 30,
    fontStyle: 'italic',
    fontSize: 34,
    alignSelf: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 50,
    alignSelf: 'center'
  },
  joinButton: {
    flex: 1,
    marginTop: 30
  },
  barInfoWrapper: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  barNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5
  },
  barInfoText: {
    color: '#FFFFFF',
    fontSize: 26,
    marginBottom: 20
  },
  loadingIcon: {
    marginTop: 30,
    flex: 1
  }
})

const mapStateToProps = ({ auth, barrunda }) => {
  return {
    fbToken: auth.token,
    jwt: auth.jwt,
    user: auth.user,
    participants: barrunda.participants,
    barrunda: barrunda.barrunda,
    isJoined: barrunda.isJoined
  }
}

export default connect(mapStateToProps, {
  userJoinBarrunda,
  fetchParticipants,
  fetchBarrunda,
  clearOldBarrunda
})(Mainscreen)
