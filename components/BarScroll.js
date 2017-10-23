import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width

class BarScroll extends Component {
  isActive(bar) {
    const now = new Date()
    if (now >= bar.startTime && now < bar.endTime) {
      return true
    } else {
      return false
    }
  }
  isPast(bar) {
    const now = new Date()
    if (now > bar.endTime) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} horizontal pagingEnabled>
        {this.props.bars.map((bar, index) => {
          if (this.isActive(bar) || (index == 0 && !this.isActive(bar))) {
            return (
              <View key={bar.name} style={styles.barInfoWrapper}>
                <Text style={styles.barInfoText}>{bar.name}</Text>
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
                  onPress={() => this.props.barMapClick(bar)}
                />
              </View>
            )
          } else {
            if (this.isPast(bar)) {
              return <View style={styles.barInfoWrapper} key={bar.name}>
                <Text>
                  Denna är övvver!
                </Text>
              </View>
            } else {
                return <View style={styles.barInfoWrapper} key={bar.name}>
                <Text>
                  Denna kommer snartttttttt
                </Text>
              </View>
            }
          }
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10
  },
  barInfoWrapper: {
    marginTop: 10,
    width: SCREEN_WIDTH,
    height: 333,
    alignItems: 'center',
    backgroundColor: 'rgba(41, 71, 124, 07)'
  },
  barInfoText: {
    color: '#dddddd',
    fontSize: 26,
    marginBottom: 20
  }
})

export default BarScroll
