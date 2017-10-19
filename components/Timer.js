import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

class Timer extends Component {
  state = {
    time: 59
  }
  componentDidMount() {
    this.ticker = setInterval(() => {
      if (this.state.time === 0) {
        this.setState({ time: 59 })
      } else {
        this.setState({ time: this.state.time - 1 })
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    const { time, timeText, timerWrapper, timer } = styles

    return (
      <View style={timerWrapper}>
        <View style={timer}>
          <Text style={time}>20</Text>
          <Text style={timeText}>Timmar</Text>
        </View>
        <View style={timer}>
          <Text style={time}>40</Text>
          <Text style={timeText}>Minuter</Text>
        </View>
        <View style={timer}>
          <Text style={time}>{this.state.time}</Text>
          <Text style={timeText}>Sekunder</Text>
        </View>
      </View>
    )
  }
}
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  timerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    marginBottom: 30
  },
  timer: {
    width: width / 3
  },
  time: {
    color: '#D66853',
    fontSize: 60,
    alignSelf: 'center',
    marginBottom: -5
  },
  timeText: {
    color: '#b2b2b2',
    fontSize: 12,
    alignSelf: 'center'
  }
})

export default Timer
