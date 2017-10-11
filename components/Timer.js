import React, { Component } from 'react'
import { View } from 'react-native'

class Timer extends Component {
  render() {
    const { time, timeText, timerWrapper } = styles

    return (
      <View style={timerWrapper}>
        <View>
          <Text style={time}>20</Text>
          <Text style={timeText}>Timmar</Text>
        </View>
        <View style={{ borderRightColor: '#ffffff' }}>
          <Text style={time}>40</Text>
          <Text style={timeText}>Minuter</Text>
        </View>
        <View>
          <Text style={time}>58</Text>
          <Text style={timeText}>Sekunder</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  time: {
    color: '#FFFFFF',
    fontSize: 60,
    alignSelf: 'center'
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    alignSelf: 'center'
  }
})

export default Timer
