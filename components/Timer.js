import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'

class Timer extends Component {
  state = {
    days: 99,
    hours: 99,
    minutes: 99,
    seconds: 99,
    loading: true
  }
  componentDidMount() {
    this.startTicker()
  }
  startTicker = () => {
    this.ticker = setInterval(() => {
      let now = new Date()
      let target = new Date(this.props.startTime)
      let difference = target.getTime() - now.getTime()
      if (difference <= 0) {
        this.setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        this.props.newBarStarts()
      } else {
        let seconds = Math.floor(difference / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let days = Math.floor(hours / 24)
        hours %= 24
        minutes %= 60
        seconds %= 60
        this.setState({
          days,
          hours,
          minutes,
          seconds
        })
        if (this.state.loading) {
          this.setState({
            loading: false
          })
        }
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    const { time, timeText, timerWrapper, timer } = styles
    if (this.state.loading) {
      return (
        <View style={[timerWrapper, { height: 92 }]}>
          <ActivityIndicator size={'large'} />
        </View>
      )
    } else {
      return (
        <View style={timerWrapper}>
          {this.state.days > 0 ? (
            <View style={timer}>
              <Text style={time}>{this.state.days}</Text>
              <Text style={timeText}>Dagar</Text>
            </View>
          ) : null}

          <View style={timer}>
            <Text style={time}>{this.state.hours}</Text>
            <Text style={timeText}>Timmar</Text>
          </View>
          <View style={timer}>
            <Text style={time}>{this.state.minutes}</Text>
            <Text style={timeText}>Minuter</Text>
          </View>
          <View style={timer}>
            <Text style={time}>{this.state.seconds}</Text>
            <Text style={timeText}>Sekunder</Text>
          </View>
        </View>
      )
    }
  }
}
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  timerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  timer: {
    width: width / 3
  },
  time: {
    color: '#FF934F',
    fontSize: 60,
    alignSelf: 'center',
    marginBottom: -5
  },
  timeText: {
    color: '#6B717E',
    fontSize: 12,
    alignSelf: 'center'
  }
})

export default Timer
