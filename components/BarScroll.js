import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native'
import { Button, Icon } from 'react-native-elements'
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
        style={styles.container}
        horizontal
        pagingEnabled
        contentOffset={{ x: 2, y: 0 }}
        indicatorStyle="white"
      >
        {this.props.bars.map((bar, index) => {
          if (this.isActive(bar) || (index == 0 && !this.isActive(bar))) {
            return (
              <View key={bar.name} style={styles.barInfoWrapper}>
                <View style={styles.barInfoCard}>
                  <Text style={styles.barInfoText}>{bar.name}</Text>
                  <Button
                    icon={{ name: 'location-on', color: '#dddddd', size: 22 }}
                    title="Visa karta"
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      borderRadius: 50,
                      width: 150,
                      height: 45,
                      borderColor: '#dddddd',
                      borderWidth: 0.8
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
                    <Text style={styles.barInfoText}>{bar.name}</Text>
                    <Text style={styles.barInfoText}>Denna är övvver!</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={styles.barInfoWrapper} key={bar.name}>
                  <View style={styles.barInfoCard}>
                    <Icon
                      raised
                      size={28}
                      name="question-circle-o"
                      type="font-awesome"
                      color="rgb(62, 92, 118)"
                      iconStyle={{ fontSize: 56 }}
                    />
                    <Text
                      style={[
                        styles.barInfoText,
                        { marginBottom: 0, fontSize: 16 }
                      ]}
                    >
                      Bar {index + 1}
                    </Text>
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
    flex: 1
  },
  barInfoWrapper: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  barInfoCard: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 20,
    width: SCREEN_WIDTH - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(62, 92, 118, 0.2)',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0
  },
  barInfoText: {
    color: '#dddddd',
    fontSize: 22,
    marginBottom: 20
  }
})

export default BarScroll
