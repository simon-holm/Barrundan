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
  Image,
  RefreshControl
} from 'react-native'
import { Button } from 'react-native-elements'

import Timer from '../components/Timer'
import ParticipantsList from '../components/ParticipantsList'
import BarScroll from '../components/BarScroll'

import {
  userJoinBarrunda,
  fetchParticipants,
  fetchBarrunda,
  clearOldBarrunda,
  fetchCurrentBar,
  userAlreadyJoinedBarrunda,
  userHasNotJoinedBarrunda
} from '../actions/barrunda_actions'

class Mainscreen extends Component {
  state = {
    loading: false,
    refreshing: false
  }
  refresh = async () => {
    await this.props.fetchBarrunda()
    await this.props.fetchCurrentBar(this.props.barrunda._id)
    await this.props.fetchParticipants(this.props.barrunda._id)
    let status = []
    this.props.participants.map(participant => {
      if (participant._id === this.props.user._id) {
        status.push(true)
      } else {
        status.push(false)
      }
    })
    if (status.includes(true)) {
      this.props.userAlreadyJoinedBarrunda()
    } else {
      this.props.userHasNotJoinedBarrunda()
    }
  }
  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.refresh().then(() => {
      this.setState({ refreshing: false })
    })
  }
  async componentWillMount() {
    console.log(this.props)
    let pushToken = await AsyncStorage.getItem('pushToken')
    if (pushToken) {
      Notifications.addListener(notification => {
        const { data: { text }, origin } = notification

        if ((origin === 'received') & text) {
          Alert.alert('Barrundan', text, [{ text: 'Ok.' }])
        }
      })
    }
    this.setState({ loading: true })
    await this.refresh()
    this.setState({ loading: false })

    this.refreshInterval = setInterval(async () => {
      await this.refresh()
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval)
  }

  onUserJoinBarrunda = async () => {
    this.setState({ loading: true })
    await this.props.userJoinBarrunda(
      this.props.user._id,
      this.props.barrunda._id
    )
    this.setState({ loading: false })
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
            onPress={this.onUserJoinBarrunda}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.barInfoWrapper}>
          <BarScroll
            bars={this.props.barrunda.bars}
            currentBar={this.props.currentBar}
            refresh={this.refresh}
            barMapClick={async bar => {
              if (bar._id != this.props.currentBar._id) {
                await this.props.fetchCurrentBar()
              }
              this.props.navigation.navigate('map')
            }}
          />
        </View>
      )
    }
  }
  isBarNotActiveYet(bar) {
    const now = new Date()
    if (now < new Date(bar.startTime)) {
      return true
    } else {
      return false
    }
  }
  renderTime = () => {
    let time
    this.props.barrunda.bars.map((bar, index) => {
      if (bar._id === this.props.currentBar._id) {
        if (index === 0 && this.isBarNotActiveYet(bar)) {
          time = bar.startTime
        } else {
          time = bar.endTime
        }
      }
    })
    return time
  }
  renderSubtitle = () => {
    return this.props.barrunda.bars.map((bar, index) => {
      if (bar._id === this.props.currentBar._id) {
        if (index === 0 && this.isBarNotActiveYet(bar)) {
          return (
            <Text key={index} style={styles.text}>
              Startar om
            </Text>
          )
        } else if (index === 3) {
          return (
            <Text key={index} style={styles.text}>
              Är slut om
            </Text>
          )
        } else {
          return (
            <Text key={index} style={styles.text}>
              Nästa bar om
            </Text>
          )
        }
      }
    })
  }
  render() {
    const { container, text, textSecond, participantList } = styles
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
      <ScrollView
        style={container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#FF934F"
            progressBackgroundColor="#FF934F"
          />
        }
      >
        <Image
          resizeMode={'contain'}
          source={require('../assets/icons/barrundan.png')}
          style={imageStyle}
        />
        {this.props.barrunda ? (
          <View>
            {this.renderSubtitle()}
            <Timer refresh={this.refresh} startTime={this.renderTime()} />
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
    marginTop: 20,
    alignSelf: 'center'
  },
  joinButton: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  barInfoWrapper: {
    flex: 1
  },
  loadingIcon: {
    marginTop: 10,
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
  userAlreadyJoinedBarrunda,
  userHasNotJoinedBarrunda
})(Mainscreen)
