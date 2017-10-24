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
  slideToBar = barNumber => {
    this.slideScroll.scrollTo({
      x: SCREEN_WIDTH * barNumber,
      y: 0,
      animated: true
    })
  }
  componentWillReceiveProps(newProps) {
    if (newProps.currentBar._id !== this.props.currentBar._id) {
      this.props.bars.map((bar, index) => {
        if (bar._id === newProps.currentBar._id) {
          this.slideToBar(index + 1)
        }
      })
    }
  }
  showRightIcon = index => {
    if (index !== 3) {
      return (
        <Icon
          size={32}
          name="chevron-right"
          type="material-community"
          color="rgba(221, 221, 221, 0.1)"
          underlayColor="transparent"
          containerStyle={{
            position: 'absolute',
            top: 45,
            right: 0
          }}
          onPress={() => this.slideToBar(index + 1)}
        />
      )
    }
  }

  showLeftIcon = index => {
    if (index !== 0) {
      return (
        <Icon
          size={32}
          name="chevron-left"
          type="material-community"
          color="rgba(221, 221, 221, 0.1)"
          underlayColor="transparent"
          containerStyle={{
            position: 'absolute',
            top: 45,
            left: 0
          }}
          onPress={() => this.slideToBar(index - 1)}
        />
      )
    }
  }

  render() {
    return (
      <ScrollView
        ref={scroller => {
          this.slideScroll = scroller
        }}
        style={styles.container}
        horizontal
        pagingEnabled
        indicatorStyle="white"
      >
        {this.props.bars.map((bar, index) => {
          if (
            this.isActive(bar) ||
            (index == 0 && !this.isActive(bar) && !this.isPast(bar))
          ) {
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
                  {this.showRightIcon(index)}
                  {this.showLeftIcon(index)}
                </View>
              </View>
            )
          } else {
            if (this.isPast(bar)) {
              return (
                <View style={styles.barInfoWrapper} key={bar.name}>
                  <View style={styles.barInfoCard}>
                    <Text style={[styles.barInfoText, { color: 'gray' }]}>
                      {bar.name}
                    </Text>
                    <Text
                      style={[
                        styles.barInfoText,
                        { color: 'gray', fontSize: 16 }
                      ]}
                    >
                      Barrundan har redan varit här :(
                    </Text>
                    {this.showRightIcon(index)}
                    {this.showLeftIcon(index)}
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
                    {this.showRightIcon(index)}
                    {this.showLeftIcon(index)}
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
    position: 'relative',
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
