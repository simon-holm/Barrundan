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
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        contentOffset={{ x: 2, y: 0 }}
        indicatorStyle="white"
      >
        {this.props.bars.map((bar, index) => {
          if (this.isActive(bar) || (index == 0 && !this.isActive(bar))) {
            return (
              <View key={bar.name} style={styles.barInfoWrapper}>
                <View
                  style={[
                    styles.barInfoCard,
                    { borderColor: '#FF934F', borderWidth: 0.5 }
                  ]}
                >
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
              </View>
            )
          } else {
            if (this.isPast(bar)) {
              return (
                <View style={styles.barInfoWrapper} key={bar.name}>
                  <View style={styles.barInfoCard}>
                    <Text style={styles.barInfoText}>Denna är övvver!</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={styles.barInfoWrapper} key={bar.name}>
                  <View style={styles.barInfoCard}>
                    <Text style={styles.barInfoText}>???</Text>
                  </View>
                </View>
              )
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
    paddingLeft: 10,
    paddingRight: 10,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    height: 330
  },
  barInfoCard: {
    marginRight: 5,
    width: SCREEN_WIDTH - 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 71, 124, 0.5)',
    borderRadius: 10
  },
  barInfoText: {
    color: '#dddddd',
    fontSize: 26,
    marginBottom: 20
  }
})

export default BarScroll
